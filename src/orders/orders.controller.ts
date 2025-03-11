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
import Order from './entities/order.entity';

@Controller('orders')
export class OrdersController {
  private ordersRepository: IOrdersRepository = new OrdersInMemoryRepository();

  @UseGuards(OnlyAdminGuard)
  @Get('')
  async findAll() {
    const orders = await this.ordersRepository.findAll();

    return orders;
  }

  @UseGuards(AuthorizationGuard)
  @Get('user/:userId')
  async findUserOrders(@Param() { userId }) {
    const orders = await this.ordersRepository.findAllByUserId(+userId);

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

  @UseGuards(AuthorizationGuard)
  @Post('create-order')
  async createOrder(@Body() createOrderDto) {
    const order = new Order(createOrderDto);

    await this.ordersRepository.save(order);
  }
}
