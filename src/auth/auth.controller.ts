import { BadRequestException, Body, Controller, Post } from '@nestjs/common';

import LoginDto from './dto/login.dto';

import IAuthRepository from './repository/auth.interface.repository';
import InMemoryAuthRepository from './repository/auth.in-memory.repository';
import LoginUseCase from './use-cases/LoginUseCase';

@Controller('auth')
export class AuthController {
  private authRepository: IAuthRepository = new InMemoryAuthRepository();

  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    const useCase = new LoginUseCase(this.authRepository);

    const res = await useCase.execute(loginDto);

    return res;
  }
}
