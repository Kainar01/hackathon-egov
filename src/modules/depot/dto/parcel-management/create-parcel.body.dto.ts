import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateUntrackedParcelBodyDto {
    @IsString()
    @IsNotEmpty()
    trackingCode!: string;

    @IsString()
    @IsNotEmpty()
    userCode!: string;

    @IsNumber()
    @IsOptional()
    weight?: number;
}