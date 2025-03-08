import { Controller, Get, UseGuards } from '@nestjs/common';
import IOrdersRepository from './repository/orders.interface.repository';
import OrdersInMemoryRepository from './repository/orders.in-memory.repository';

// guards
import { OnlyAdminGuard } from '../authorization/authorization.guard';

@Controller('orders')
export class OrdersController {
  private ordersRepository: IOrdersRepository = new OrdersInMemoryRepository();

  @UseGuards(OnlyAdminGuard)
  @Get('')
  async findAll() {
    const orders = await this.ordersRepository.findAll();

    return orders;
  }
}
