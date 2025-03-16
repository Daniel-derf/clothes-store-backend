import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';

import LoginDto from './dto/login.dto';
import RegisterDto from './dto/register.dto';

// repositories
import IUsersRepository from '../users/repository/users.interface.repository';
import UsersInMemoryRepository from '../users/repository/users.in-memory.repository';

import LoginUseCase from './use-cases/LoginUseCase';
import RegisterUseCase from './use-cases/RegisterUseCase';
import UsersPostgresRepository from '../users/repository/users.postgres.repository';

@Controller('auth')
export class AuthController {
  constructor(@Inject('IUsersRepository') readonly usersRepository) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    const useCase = new LoginUseCase(this.usersRepository);

    const res = await useCase.execute(loginDto).catch((err) => {
      if (err.message === 'Invalid credentials')
        throw new BadRequestException('Invalid Credentials');
    });

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
