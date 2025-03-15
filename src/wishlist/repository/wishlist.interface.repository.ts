import Wishlist from '../entities/wishlist.entity';

export default interface IWishlistRepository {
  findByUserId(userId: number): Promise<Wishlist>;

  save(wishlist: Wishlist): Promise<void>;
}
