import { Controller, Get, Inject, Param, UseGuards } from '@nestjs/common';

import FindAllUsersUseCase from './use-cases/FindAllUsersUseCase';
import FindUserByIdUseCase from './use-cases/FindUserByIdUseCase';

import {
  AuthorizationGuard,
  OnlyAdminGuard,
} from '../authorization/authorization.guard';

@Controller('users')
export class UsersController {
  constructor(@Inject('IUsersRepository') readonly usersRepository) {}

  @UseGuards(OnlyAdminGuard)
  @Get('')
  async findAll() {
    const useCase = new FindAllUsersUseCase(this.usersRepository);

    const users = await useCase.execute();

    return users;
  }

  @UseGuards(AuthorizationGuard)
  @Get(':id')
  async findById(@Param() { id }) {
    const useCase = new FindUserByIdUseCase(this.usersRepository);

    const user = await useCase.execute(+id);

    return user;
  }
}
