import IOrdersRepository from './orders.interface.repository';

export default class OrdersInMemoryRepository implements IOrdersRepository {
  private orders: any[] = [
    {
      id: 1,
      userId: 101,
      productsIds: [201, 202],
      totalPrice: 100.5,
      status: 'pending',
    },
    {
      id: 2,
      userId: 102,
      productsIds: [203],
      totalPrice: 50.0,
      status: 'completed',
    },
    {
      id: 3,
      userId: 103,
      productsIds: [204, 205, 206],
      totalPrice: 150.75,
      status: 'shipped',
    },
  ];

  async save(order: any): Promise<void> {
    this.orders.push(order);
  }

  async findById(id: number): Promise<any> {
    return this.orders.find((order) => order.id === id);
  }

  async findAll(): Promise<any[]> {
    return this.orders;
  }
}
