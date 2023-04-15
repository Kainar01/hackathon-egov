import { IsNotEmpty, IsString } from "class-validator";

export class clientSendVerificationDto{
    @IsNotEmpty()
    @IsString()
    iin!:string
}