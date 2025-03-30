import Order from '../../orders/entities/order.entity';
import IProductsRepository from '../../products/repository/products.interface.repository';
import IUsersRepository from '../../users/repository/users.interface.repository';
import Cart from '../entities/cart.entity';
import ICartRepository from '../repository/cart.interface.repository';

export default class RemoveCartItemUseCase {
  constructor(
    readonly cartRepository: ICartRepository,
    readonly productsRepository: IProductsRepository,
  ) {}

  async execute(input: Input) {
    const { productId, productSize, productQuantity, userId } = input;

    let cart = await this.cartRepository.findByUserId(userId);

    if (!cart) throw new Error('Cart not found');

    cart.removeProduct({ productId, productSize, productQuantity });

    await this.cartRepository.save(cart);
  }
}

type Input = {
  productId: number;
  productSize: string;
  productQuantity: number;
  userId: number;
};
