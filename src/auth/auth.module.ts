import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import UsersPostgresRepository from '../users/repository/users.postgres.repository';

@Module({
  controllers: [AuthController],
  providers: [],
})
export class AuthModule {}
