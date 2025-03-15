import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import UsersInMemoryRepository from './repository/users.in-memory.repository';
import FindAllUsersUseCase from './use-cases/FindAllUsersUseCase';
import FindUserByIdUseCase from './use-cases/FindUserByIdUseCase';
import OrdersInMemoryRepository from '../orders/repository/orders.in-memory.repository';
import Order from '../orders/entities/order.entity';
import UpdateOrderStatusUseCase from '../orders/use-cases/UpdateOrderStatusUseCase';
import {
  AuthorizationGuard,
  OnlyAdminGuard,
} from '../authorization/authorization.guard';
import UsersPostgresRepository from './repository/users.postgres.repository';

@Controller('users')
export class UsersController {
  usersRepository = new UsersPostgresRepository();

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

  // @UseGuards(AuthorizationGuard)
  // @Get(':id/orders')
  // async findUserOrders(@Param() { id }) {
  //   const orders = await this.ordersRepository.findAllByUserId(+id);

  //   return orders;
  // }

  // @UseGuards(AuthorizationGuard)
  // @Get(':id/orders/:orderId')
  // async findUserOrder(@Param() { id, orderId }) {
  //   const order = await this.ordersRepository.findOneByUserId(+id, +orderId);

  //   return order;
  // }

  // @UseGuards(AuthorizationGuard)
  // @Patch(':id/orders/:orderId/update-status')
  // async updateUserOrderStatus(@Param() { id, orderId }, @Body() { status }) {
  //   const useCase = new UpdateOrderStatusUseCase(this.ordersRepository);

  //   await useCase.execute(+orderId, +id, status);
  // }

  // @UseGuards(AuthorizationGuard)
  // @Post(':id/orders')
  // async createUserOrder(@Body() createOrderDto) {
  //   const order = new Order(createOrderDto);

  //   await this.ordersRepository.save(order);
  // }
}
