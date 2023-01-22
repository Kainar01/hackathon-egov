import { ApiProperty } from "@nestjs/swagger";

export class CityResponseDto {
    @ApiProperty()
    cityId!: number

    @ApiProperty()
    name!: string

    @ApiProperty()
    slug!: string
}