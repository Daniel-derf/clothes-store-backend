// repositories
import IProductsRepository from '../repository/products.interface.repository';

export default class DeleteProductByIdUseCase {
  constructor(readonly productsRepository: IProductsRepository) {}

  async execute(id: number) {
    const productExists = await this.productsRepository.findById(id);

    if (!productExists) throw new Error(`The product ${id} was not found`);

    await this.productsRepository.delete(id);
  }
}
