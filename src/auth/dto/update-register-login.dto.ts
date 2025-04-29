import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateRegisterLoginDto {
    @ApiProperty()
    @IsString()
    username: string

    @ApiProperty()
    @IsString()
    password: string
}
