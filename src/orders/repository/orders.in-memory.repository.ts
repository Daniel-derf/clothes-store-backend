import IOrdersRepository from './orders.interface.repository';

export default class OrdersInMemoryRepository implements IOrdersRepository {
  private orders: any[] = [
    {
      id: 1,
      userId: 1,
      productsIds: [201, 202],
      totalPrice: 100.5,
      status: 'pending',
    },
    {
      id: 2,
      userId: 1,
      productsIds: [203],
      totalPrice: 50.0,
      status: 'completed',
    },
    {
      id: 3,
      userId: 2,
      productsIds: [204, 205, 206],
      totalPrice: 150.75,
      status: 'shipped',
    },
  ];

  async save(order: any): Promise<void> {
    this.orders.push(order);
  }

  async findAllByUserId(userId: number): Promise<any> {
    const orders = this.orders.filter((order) => order.userId === userId);

    return orders;
  }

  async findOneByUserId(userId: number, orderId: number): Promise<any> {
    return this.orders.find(
      (order) => order.userId === userId && order.id === orderId,
    );
  }

  async findById(id: number): Promise<any> {
    return this.orders.find((order) => order.id === id);
  }

  async findAll(): Promise<any[]> {
    return this.orders;
  }
}
