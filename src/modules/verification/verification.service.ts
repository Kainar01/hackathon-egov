import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SentryService } from '@ntegral/nestjs-sentry';
import _ from 'lodash';
import moment from 'moment';
import { Repository } from 'typeorm';
import type { EntityManager } from 'typeorm';

import { MobizonConfig } from '@/config/mobizon.config';

import type { ConfirmVerificationResponseDto } from './dto/confirm-auth-verification.response.dto';
import { SmsService } from './sms.service';
import { VerificationEntity } from './verification.entity';
import type { SendVerificationRO, Verification } from './verification.interface';

@Injectable()
export class VerificationService {
  private SMS_EXPIRATION_DURATION: number = 10 * 60; // in seconds

  private SMS_TEXT_PREFIX: string = 'Код подтверждения для pro-cargo.kz:';

  private MOBIZON_DISABLED: boolean = MobizonConfig.MOBIZON_DISABLED;

  constructor(
    @InjectRepository(VerificationEntity) private verificationRepository: Repository<VerificationEntity>,
    private readonly sms: SmsService,
    private readonly sentry: SentryService,
  ) {}

  public async getVerificationById(verificationId: string): Promise<Verification | null> {
    return this.verificationRepository.findOne({ where: { verificationId } });
  }

  public async confirmVerification(verificationId: string, smsCode: string): Promise<ConfirmVerificationResponseDto> {
    const verification = await this.verificationRepository.findOne({
      where: {
        smsCode,
        verificationId,
        isVerified: false,
      },
    });

    const isInvalid = !verification || moment().isAfter(moment(verification.expiration));

    if (isInvalid) {
      throw new BadRequestException('Невалидный код или уже был использован');
    }

    const { affected } = await this.verificationRepository.update({ smsCode, verificationId, isVerified: false }, { isVerified: true });

    if (affected === 0) {
      throw new BadRequestException('Код уже был использован');
    }

    return { isVerified: true };
  }

  public async sendVerification(phone: string, countryCode: string): Promise<SendVerificationRO> {
    return this.verificationRepository.manager.transaction(async (entityManager: EntityManager) => {
      const verification = entityManager.create(VerificationEntity, {
        phone,
        countryCode,
        expiration: moment().add(this.SMS_EXPIRATION_DURATION, 'seconds'),
        smsCode: this.generateCode(),
      });

      await entityManager.save(verification);

      if (this.MOBIZON_DISABLED) {
        this.sentry.debug(`Verification code sent to ${phone}: ${verification.smsCode}`);
      } else {
        await this.sms.sendMessage({
          recipient: phone,
          text: `${this.SMS_TEXT_PREFIX} ${verification.smsCode}`,
          name: 'pro-cargo.kz',
        });
      }

      return _.pick(verification, ['verificationId', 'isVerified']);
    });
  }

  private generateCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
}
