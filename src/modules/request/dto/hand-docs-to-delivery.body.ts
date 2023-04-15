import { IsString } from 'class-validator';

export class HandDocsToDeliveryBody {
  @IsString()
  public operatorCode!: string;
}
