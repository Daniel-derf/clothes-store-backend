import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import IOrdersRepository from './repository/orders.interface.repository';
import OrdersInMemoryRepository from './repository/orders.in-memory.repository';

// guards
import {
  AuthorizationGuard,
  OnlyAdminGuard,
} from '../authorization/authorization.guard';
import UpdateOrderStatusUseCase from './use-cases/UpdateOrderStatusUseCase';
import CreateOrderUseCase from './use-cases/CreateOrderUseCase';
import OrdersPostgresRepository from './repository/orders.postgres.repository';

@Controller('orders')
export class OrdersController {
  private ordersRepository: IOrdersRepository = new OrdersPostgresRepository();

  @Get('')
  async findAll(@Req() req) {
    // const userId = req.user.id;
    const userId = 1;

    const orders = await this.ordersRepository.findAllByUserId(userId);

    return orders;
  }

  @UseGuards(AuthorizationGuard)
  @Get(':id')
  async findOrderById(@Param() { id }) {
    const order = await this.ordersRepository.findById(+id);

    return order;
  }

  @UseGuards(OnlyAdminGuard)
  @Patch(':orderId/update-status')
  async updateOrderStatus(@Param() { orderId }, @Body() { status }) {
    const useCase = new UpdateOrderStatusUseCase(this.ordersRepository);

    await useCase.execute(+orderId, status);
  }

  @Post('create-order')
  async createOrder(@Body() createOrderDto, @Req() req) {
    const useCase = new CreateOrderUseCase(this.ordersRepository);

    // await useCase.execute(createOrderDto, +req.user.id);
    await useCase.execute(createOrderDto, 1);
  }
}
