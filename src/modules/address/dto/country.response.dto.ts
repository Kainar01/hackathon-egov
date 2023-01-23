import { ApiProperty } from "@nestjs/swagger";

export class CountryResponseDto {
    @ApiProperty()
    countryId!: number

    @ApiProperty()
    name!: string

    @ApiProperty()
    slug!: string
}