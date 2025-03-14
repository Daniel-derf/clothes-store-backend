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

  async save(wishlist: Wishlist): Promise<void> {
    const index = this.wishlists.findIndex((w) => w.id === wishlist.id);
    if (index !== -1) {
      this.wishlists[index] = wishlist;
    } else {
      this.wishlists.push(wishlist);
    }
  }
}
