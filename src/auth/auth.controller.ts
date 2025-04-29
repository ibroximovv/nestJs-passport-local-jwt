import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAndLoginDto } from './dto/register-login.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { UpdateRegisterLoginDto } from './dto/update-register-login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  register(@Body() data: RegisterAndLoginDto){
    return this.authService.register(data)
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Body() data: UpdateRegisterLoginDto, @Req() req: Request) {
    // console.log(req.user);
    return this.authService.login(req.user)
  }

  @Get('users')
  getUsers(){
    return this.authService.getUsers()
  }
}
