import { IsString } from 'class-validator';

export class HandDocsToClientBody {
  @IsString()
  public clientCode!: string;
}
