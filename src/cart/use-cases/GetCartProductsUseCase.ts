import ICartRepository from '../repository/cart.interface.repository';

export default class GetCartProductsUseCase {
  constructor(readonly cartRepository: ICartRepository) {}

  async execute(userId: number) {
    const cart = await this.cartRepository.findByUserId(userId);

    if (!cart) return [];

    const products = cart.getProducts();

    return products;
  }
}
