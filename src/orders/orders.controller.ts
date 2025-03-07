import { Controller, Get } from '@nestjs/common';
import { OrdersService } from './orders.service';
import IOrdersRepository from './repository/orders.interface.repository';
import OrdersInMemoryRepository from './repository/orders.in-memory.repository';

@Controller('orders')
export class OrdersController {
  private ordersRepository: IOrdersRepository = new OrdersInMemoryRepository();

  @Get('')
  async findAll() {
    const orders = await this.ordersRepository.findAll();

    return orders;
  }
}
