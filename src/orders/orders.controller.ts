import { Controller, Get, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import IOrdersRepository from './repository/orders.interface.repository';
import OrdersInMemoryRepository from './repository/orders.in-memory.repository';
import { OnlyAdminGuard } from 'src/authorization/authorization.guard';

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
