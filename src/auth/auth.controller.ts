import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';

import LoginDto from './dto/login.dto';
import RegisterDto from './dto/register.dto';

import IAuthRepository from './repository/auth.interface.repository';
import InMemoryAuthRepository from './repository/auth.in-memory.repository';
import LoginUseCase from './use-cases/LoginUseCase';
import RegisterUseCase from './use-cases/RegisterUseCase';

@Controller('auth')
export class AuthController {
  private authRepository: IAuthRepository = new InMemoryAuthRepository();

  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    const useCase = new LoginUseCase(this.authRepository);

    const res = await useCase.execute(loginDto);

    return res;
  }

  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerDto: RegisterDto) {
    const useCase = new RegisterUseCase(this.authRepository);

    await useCase.execute(registerDto);

    return;
  }
}
