// entities
import { Product } from '../entities/product.entity';

// repositories
import IProductsRepository from '../repository/products.interface.repository';

export default class ApplyProductDiscountUseCase {
  constructor(readonly productsRepository: IProductsRepository) {}

  async execute(id: number, percentage: number) {
    const product: Product = await this.productsRepository.findById(id);

    if (!product) throw new Error(`The product ${id} was not found`);

    product.applyDiscount(percentage);

    await this.productsRepository.save(product);
  }
}
