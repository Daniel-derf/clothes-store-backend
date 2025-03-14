import Wishlist from '../entities/wishlist.entity';
import IWishlistRepository from './wishlist.interface.repository';

export default class WishlistInMemoryRepository implements IWishlistRepository {
  wishlists: Wishlist[] = [
    new Wishlist({ id: 1, userId: 4, productsIds: [1, 2] }),
  ];

  async findByUserId(userId: number): Promise<Wishlist> {
    const wishlist = this.wishlists.find((w) => w.userId === userId);

    return wishlist;
  }
  async save(wishlist: any): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
