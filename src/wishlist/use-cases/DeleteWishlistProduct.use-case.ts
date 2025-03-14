// repositories
import IWishlistRepository from '../repository/wishlist.interface.repository';

export default class DeleteWishlistProductUseCase {
  constructor(readonly wishlistRepository: IWishlistRepository) {}

  async execute(input: Input) {
    const { userId, productsIds } = input;

    const wishlist = await this.wishlistRepository.findByUserId(userId);

    wishlist.removeProducts(productsIds);

    await this.wishlistRepository.save(wishlist);
  }
}

type Input = {
  userId: number;
  productsIds: number[];
};
