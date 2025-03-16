import Cart from '../entities/cart.entity';

export default interface ICartRepository {
  findByUserId(userId: number): Promise<Cart>;

  save(cart: Cart): Promise<void>;
}
