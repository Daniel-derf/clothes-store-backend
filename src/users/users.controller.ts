import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import UsersInMemoryRepository from './repository/users.in-memory.repository';
import FindAllUsersUseCase from './use-cases/FindAllUsersUseCase';
import FindUserByIdUseCase from './use-cases/FindUserByIdUseCase';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  repository = new UsersInMemoryRepository();

  @Get('')
  async findAll() {
    const useCase = new FindAllUsersUseCase(this.repository);

    const users = await useCase.execute();

    return users;
  }

  @Get(':id')
  async findById(@Param() { id }) {
    const useCase = new FindUserByIdUseCase(this.repository);

    const user = await useCase.execute(+id);

    return user;
  }
}
