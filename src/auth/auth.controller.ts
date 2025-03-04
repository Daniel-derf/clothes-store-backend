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

// repositories
import IUsersRepository from '../users/repository/users.interface.repository';
import UsersInMemoryRepository from '../users/repository/users.in-memory.repository';

import LoginUseCase from './use-cases/LoginUseCase';
import RegisterUseCase from './use-cases/RegisterUseCase';

@Controller('auth')
export class AuthController {
  private usersRepository: IUsersRepository = new UsersInMemoryRepository();

  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    const useCase = new LoginUseCase(this.usersRepository);

    const res = await useCase.execute(loginDto);

    return res;
  }

  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerDto: RegisterDto) {
    const useCase = new RegisterUseCase(this.usersRepository);

    await useCase.execute(registerDto);

    return;
  }
}
