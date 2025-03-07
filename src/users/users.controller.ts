import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import UsersInMemoryRepository from './repository/users.in-memory.repository';
import FindAllUsersUseCase from './use-cases/FindAllUsersUseCase';
import FindUserByIdUseCase from './use-cases/FindUserByIdUseCase';
import OrdersInMemoryRepository from '../orders/repository/orders.in-memory.repository';
import Order from '../orders/entities/order.entity';
import UpdateOrderStatusUseCase from './use-cases/UpdateOrderStatusUseCase';

@Controller('users')
export class UsersController {
  usersRepository = new UsersInMemoryRepository();
  ordersRepository = new OrdersInMemoryRepository();

  @Get('')
  async findAll() {
    const useCase = new FindAllUsersUseCase(this.usersRepository);

    const users = await useCase.execute();

    return users;
  }

  @Get(':id')
  async findById(@Param() { id }) {
    const useCase = new FindUserByIdUseCase(this.usersRepository);

    const user = await useCase.execute(+id);

    return user;
  }

  @Get(':id/orders')
  async findUserOrders(@Param() { id }) {
    const orders = await this.ordersRepository.findAllByUserId(+id);

    return orders;
  }

  @Get(':id/orders/:orderId')
  async findUserOrder(@Param() { id, orderId }) {
    const order = await this.ordersRepository.findOneByUserId(+id, +orderId);

    return order;
  }

  @Patch(':userId/orders/:orderId/update-status')
  async updateUserOrderStatus(
    @Param() { userId, orderId },
    @Body() { status },
  ) {
    console.log({ userId, orderId });

    const useCase = new UpdateOrderStatusUseCase(this.ordersRepository);

    await useCase.execute(+orderId, +userId, status);
  }

  @Post(':id/orders')
  async createUserOrder(@Param() { id }, @Body() createOrderDto) {
    const order = new Order(createOrderDto);

    await this.ordersRepository.save(order);
  }
}
