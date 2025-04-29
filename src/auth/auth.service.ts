import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterAndLoginDto } from './dto/register-login.dto';
import * as bcrypt from "bcrypt";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaService, private readonly jwt: JwtService ){}

    async register(data: RegisterAndLoginDto){
        try {
            const one = await this.prisma.user.findFirst({ where: { username: data.username }})
            if (one) {
                throw new BadRequestException('User already exists')
            }
            const hashedPassword = bcrypt.hashSync(data.password, 10)
            return await this.prisma.user.create({ data: { ...data, password: hashedPassword } })
        } catch (error) {
            console.log(error.message);
            throw new InternalServerErrorException(error.message || 'Internal server error')
        }
    }

    async validate(username: string, password: string ) {
        try {
            const findUser = await this.prisma.user.findFirst({ where: { username: username }})
            if (findUser) {
                const matchPassword = bcrypt.compareSync(password, findUser.password)
                if (matchPassword) {
                    return findUser
                } else {
                    null
                }
            }
            null
        } catch (error) {
            console.log(error.message);
            throw new InternalServerErrorException(error.message || 'Internal server error')
        }
    }

    async getUsers(){
        try {
            return this.prisma.user.findMany()
        } catch (error) {
            console.log(error.message);
            throw new InternalServerErrorException(error.message || 'Internal server error')
        }
    }

    async login(user: any ){
        try {
            const token = this.jwt.sign({ id: user.id, role: user.role })
            return { token }
        } catch (error) {
            throw new InternalServerErrorException(error.message || 'Internal server error')
        }
    }
}
