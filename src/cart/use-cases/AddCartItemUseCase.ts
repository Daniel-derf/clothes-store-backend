import Order from '../../orders/entities/order.entity';
import IProductsRepository from '../../products/repository/products.interface.repository';
import IUsersRepository from '../../users/repository/users.interface.repository';
import Cart from '../entities/cart.entity';
import ICartRepository from '../repository/cart.interface.repository';

export default class AddCartItemUseCase {
  constructor(
    readonly cartRepository: ICartRepository,
    readonly productsRepository: IProductsRepository,
  ) {}

  async execute(input: Input) {
    const { productId, productSize, productQuantity, userId } = input;

    const product = await this.productsRepository.findById(productId);
    if (!product) throw new Error('This product was not found');

    let cart = await this.cartRepository.findByUserId(userId);
    if (!cart) cart = new Cart({ id: 0, userId, products: [] });

    cart.addProduct({ productId, productSize, productQuantity });

    await this.cartRepository.save(cart);
  }
}

type Input = {
  productId: number;
  productSize: string;
  productQuantity: number;
  userId: number;
};
