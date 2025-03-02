// repositories
import IProductsRepository from '../repository/products.interface.repository';

export default class FindOneProductUseCase {
  constructor(readonly productsRepository: IProductsRepository) {}

  async execute(id: number) {
    const product = await this.productsRepository.findById(id);

    return product;
  }
}
