import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateParcelBodyDto {
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