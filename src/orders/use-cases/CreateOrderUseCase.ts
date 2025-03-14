import IOrdersRepository from '../repository/orders.interface.repository';
import Order from '../entities/order.entity';

export default class CreateOrderUseCase {
  constructor(readonly ordersRepository: IOrdersRepository) {}

  async execute(createOrderDto: any, userId: number) {
    const order = new Order(createOrderDto);
    order.userId = userId;

    await this.ordersRepository.save(order);
  }
}
