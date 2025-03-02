import { Product } from '../entities/product.entity';
import IProductsRepository from './products.interface.repository';

export class InMemoryProductsRepository implements IProductsRepository {
  private products: Product[] = [
    new Product(1, 'Product 1', 100, 'M', 'Description 1', 1, { gg: 5 }),
    new Product(2, 'Product 2', 200, 'F', 'Description 2', 2, { gg: 3 }),
    new Product(3, 'Product 3', 300, 'M', 'Description 3', 3, { gg: 2 }),
    new Product(4, 'Product 4', 400, 'F', 'Description 4', 4, { gg: 4 }),
    new Product(5, 'Product 5', 500, 'M', 'Description 5', 5, { gg: 1 }),
  ];

  async findAll(): Promise<Product[]> {
    return this.products;
  }

  async findById(id: number): Promise<Product | null> {
    const product = this.products.find((product) => product.id === id);
    return product || null;
  }

  async save(product: Product): Promise<void> {
    const index = this.products.findIndex((p) => p.id === product.id);
    if (index !== -1) {
      this.products[index] = product;
    } else {
      this.products.push(product);
    }
  }

  async delete(productId: number): Promise<void> {
    this.products = this.products.filter((product) => product.id !== productId);
  }
}
