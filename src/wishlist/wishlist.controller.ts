import { Controller, Get, Post, Req } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import IWishlistRepository from './repository/wishlist.interface.repository';
import WishlistInMemoryRepository from './repository/wishlist.in-memory.repository';
import IProductsRepository from '../products/repository/products.interface.repository';
import { InMemoryProductsRepository } from '../products/repository/products.in-memory.repository';

@Controller('wishlist')
export class WishlistController {
  constructor() {}

  private wishlistRepository: IWishlistRepository =
    new WishlistInMemoryRepository();
  private productsRepository: IProductsRepository =
    new InMemoryProductsRepository();

  @Post('add-products')
  addProductToWishlist(@Req() req) {
    const userId = req.user.id;
    const productsIds = req.body?.productsIds;
  }

  @Get('products')
  async getWishlistProducts(@Req() req) {
    const userId = req.user.id;

    const wishlist = await this.wishlistRepository.findByUserId(userId);

    const productsIds = wishlist.productsIds;

    const products = await Promise.all(
      productsIds.map(async (productId) => {
        return await this.productsRepository.findById(productId);
      }),
    );

    return products;
  }
}
