// repositories
import IProductsRepository from '../repository/products.interface.repository';

export default class FindAllProductsUseCase {
  constructor(readonly productsRepository: IProductsRepository) {}

  async execute() {
    const products = await this.productsRepository.findAll();

    return products;
  }
}
