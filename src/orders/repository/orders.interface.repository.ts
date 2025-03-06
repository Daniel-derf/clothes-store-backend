export default interface IOrdersRepository {
  findById(id: number): Promise<any>;

  findAll(): Promise<any>;

  findAllByUserId(userId: number): Promise<any>;

  findOneByUserId(userId: number, orderId: number): Promise<any>;

  save(order: any): Promise<void>;
}
