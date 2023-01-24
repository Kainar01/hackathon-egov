import { OmitType, PartialType } from '@nestjs/swagger';
import { ValidateIf, IsNumber, IsNotEmpty } from 'class-validator';
import { CreateDepotBodyDto } from './create-depot.body.dto';

export class UpdateDepotBodyDto extends PartialType(OmitType(CreateDepotBodyDto, ['buyerFee'] as const)) {
  @ValidateIf((dto) => dto.allowOrder)
  @IsNumber()
  @IsNotEmpty()
  buyerFee?: number;
}
