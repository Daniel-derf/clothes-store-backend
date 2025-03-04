export default interface IOrdersRepository {
  findById(id: number): Promise<any>;

  findAll(): Promise<any>;

  save(order: any): Promise<void>;
}
