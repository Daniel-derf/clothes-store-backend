import IOrdersRepository from 'src/orders/repository/orders.interface.repository';
import { Status } from 'src/orders/entities/order.entity';

export default class UpdateOrderStatusUseCase {
  constructor(readonly ordersRepository: IOrdersRepository) {}

  async execute(orderId: number, newStatus: Status) {
    const order = await this.ordersRepository.findById(orderId);

    if (!order) throw new Error('Order not found');

    order.updateStatus(newStatus);

    await this.ordersRepository.save(order);
  }
}
