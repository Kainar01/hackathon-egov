import { IsString } from 'class-validator';

export class CreateProviderDto {
  @IsString()
  public phone!: string;

  @IsString()
  public name!: string;
}
