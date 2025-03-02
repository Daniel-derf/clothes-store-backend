import { Product } from '../entities/product.entity';

export default interface IProductsRepository {
  findAll(): Promise<Product[]>;
  findById(id: number): Promise<Product>;
  save(product: Product): Promise<void>;
  delete(productId: number): Promise<void>;
}
