import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateProductDto {
    @ApiProperty({ example: 'Ais tea'})
    @IsString()
    name: string

    @ApiProperty({ example: 4.999 })
    @IsNumber()
    price: number

    @ApiProperty({ example: 12 })
    @IsNumber()
    count: number
}
