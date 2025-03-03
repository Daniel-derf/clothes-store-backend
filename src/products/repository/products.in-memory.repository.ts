import { Product } from '../entities/product.entity';
import IProductsRepository from './products.interface.repository';

export class InMemoryProductsRepository implements IProductsRepository {
  private products: Product[] = [
    new Product({
      id: 1,
      name: 'Product 1',
      price: 100,
      sex: 'M',
      description: 'Description 1',
      ratingId: 1,
      availableSizeQtt: { gg: 5 },
      appliedDiscountPercentage: 0,
    }),
    new Product({
      id: 2,
      name: 'Product 2',
      price: 200,
      sex: 'F',
      description: 'Description 2',
      ratingId: 2,
      availableSizeQtt: { gg: 3 },
      appliedDiscountPercentage: 0,
    }),
    new Product({
      id: 3,
      name: 'Product 3',
      price: 300,
      sex: 'M',
      description: 'Description 3',
      ratingId: 3,
      availableSizeQtt: { gg: 2 },
      appliedDiscountPercentage: 0,
    }),
    new Product({
      id: 4,
      name: 'Product 4',
      price: 400,
      sex: 'F',
      description: 'Description 4',
      ratingId: 4,
      availableSizeQtt: { gg: 4 },
      appliedDiscountPercentage: 0,
    }),
    new Product({
      id: 5,
      name: 'Product 5',
      price: 500,
      sex: 'M',
      description: 'Description 5',
      ratingId: 5,
      availableSizeQtt: { gg: 1 },
      appliedDiscountPercentage: 0,
    }),
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
      const id = this.products.length + 1;

      const { name, price, sex, description, ratingId, availableSizeQtt } =
        product;

      const newProduct = new Product({
        id,
        name,
        price,
        sex,
        description,
        ratingId,
        availableSizeQtt,
      });

      this.products.push(newProduct);
    }
  }

  async delete(productId: number): Promise<void> {
    this.products = this.products.filter((product) => product.id !== productId);
  }
}
