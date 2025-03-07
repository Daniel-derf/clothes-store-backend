import IOrdersRepository from 'src/orders/repository/orders.interface.repository';

export default class UpdateOrderStatusUseCase {
  constructor(readonly ordersRepository: IOrdersRepository) {}

  async execute(orderId: number, userId: number, newStatus: string) {
    const order = await this.ordersRepository.findOneByUserId(userId, orderId);

    console.log({ order });

    order.status = newStatus;

    await this.ordersRepository.save(order);
  }
}
