import { IsNumber } from 'class-validator';

export class AcceptOrdersBody {
  @IsNumber({}, { each: true })
  public userRequestIds!: number[];
}
