import IOrdersRepository from 'src/orders/repository/orders.interface.repository';
import { Status } from 'src/orders/entities/order.entity';

export default class UpdateOrderStatusUseCase {
  constructor(readonly ordersRepository: IOrdersRepository) {}

  async execute(orderId: number, userId: number, newStatus: Status) {
    const order = await this.ordersRepository.findOneByUserId(userId, orderId);

    order.updateStatus(newStatus);

    await this.ordersRepository.save(order);
  }
}
