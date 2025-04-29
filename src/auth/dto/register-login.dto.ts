import { ApiProperty } from "@nestjs/swagger";
import { UserRole } from "@prisma/client";
import { IsEnum, IsString } from "class-validator";

export class RegisterAndLoginDto {
    @ApiProperty()
    @IsString()
    username: string

    @ApiProperty()
    @IsString()
    password: string

    @ApiProperty({ enum: UserRole })
    @IsEnum(UserRole)
    role: UserRole
}