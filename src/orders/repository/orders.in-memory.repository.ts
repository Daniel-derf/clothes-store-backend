import Order from '../entities/order.entity';
import IOrdersRepository from './orders.interface.repository';

export default class OrdersInMemoryRepository implements IOrdersRepository {
  private orders: any[] = [
    {
      id: 1,
      userId: 1,
      productsIds: [201, 202],
      totalPrice: 100.5,
      status: 'CANCELLED',
    },
    {
      id: 2,
      userId: 1,
      productsIds: [203],
      totalPrice: 50.0,
      status: 'TRANSPORT',
    },
    {
      id: 3,
      userId: 2,
      productsIds: [204, 205, 206],
      totalPrice: 150.75,
      status: 'PREPARATION',
    },
    {
      id: 4,
      userId: 4,
      productsIds: [204, 205, 206],
      totalPrice: 150.75,
      status: 'PREPARATION',
    },
  ];

  private toOrderEntity(order: any): Order {
    return new Order(order);
  }

  async save(order: any): Promise<void> {
    const index = this.orders.findIndex((p) => p.id === order.id);
    if (index !== -1) {
      this.orders[index] = order;
    } else {
      const id = this.orders.length + 1;

      order.id = id;

      this.orders.push(order);
    }
  }

  async findAllByUserId(userId: number): Promise<Order[]> {
    const orders = this.orders.filter((order) => order.userId === userId);
    return orders.map(this.toOrderEntity);
  }

  async findOneByUserId(
    userId: number,
    orderId: number,
  ): Promise<Order | undefined> {
    const order = this.orders.find(
      (order) => order.userId === userId && order.id === orderId,
    );
    return order ? this.toOrderEntity(order) : undefined;
  }

  async findById(id: number): Promise<Order | undefined> {
    const order = this.orders.find((order) => order.id === id);
    return order ? this.toOrderEntity(order) : undefined;
  }

  async findAll(): Promise<Order[]> {
    return this.orders.map(this.toOrderEntity);
  }
}
