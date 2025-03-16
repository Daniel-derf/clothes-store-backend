import Cart from '../entities/cart.entity';
import ICartRepository from './cart.interface.repository';

export default class CartInMemoryRepository implements ICartRepository {
  private carts: Cart[] = [];

  async findByUserId(userId: number): Promise<Cart | null> {
    return this.carts.find((cart) => cart.userId === userId) || null;
  }

  async save(cart: Cart): Promise<void> {
    const existingIndex = this.carts.findIndex((c) => c.userId === cart.userId);

    if (existingIndex !== -1) {
      this.carts[existingIndex] = cart;
    } else {
      this.carts.push(cart);
    }
  }
}
