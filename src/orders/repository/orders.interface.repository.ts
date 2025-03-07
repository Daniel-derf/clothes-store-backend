import Order from '../entities/order.entity';

export default interface IOrdersRepository {
  findById(id: number): Promise<Order>;

  findAll(): Promise<Order[]>;

  findAllByUserId(userId: number): Promise<Order[]>;

  findOneByUserId(userId: number, orderId: number): Promise<Order>;

  save(order: Order): Promise<void>;
}
