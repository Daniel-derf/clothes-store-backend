import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import UsersInMemoryRepository from './repository/users.in-memory.repository';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('')
  findAll() {
    const repository = new UsersInMemoryRepository();

    const users = repository.findAll();

    return users;
  }
}
