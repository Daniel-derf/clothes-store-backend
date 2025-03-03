import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

import { sign } from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import IAuthRepository from './repository/auth.interface.repository';
import InMemoryAuthRepository from './repository/auth.in-memory.repository';

interface LoginDto {
  email: string;
  password: string;
}

export const createAccessToken = (serializedUser): string => {
  const secret = 'test-secret';
  const expiresIn = '1d';

  return sign(serializedUser, secret, {
    expiresIn,
  });
};

@Controller('auth')
export class AuthController {
  private authRepository: IAuthRepository = new InMemoryAuthRepository();

  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.authRepository.findByEmail(email);

    if (!user)
      throw new BadRequestException(`User does not exist in the system`);

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (passwordMatches) {
      const jwt = createAccessToken(user);

      return { jwt };
    }
    throw new BadRequestException(`Invalid credentials`);
  }
}
