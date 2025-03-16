import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  NotFoundException,
  Post,
  Req,
} from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import IWishlistRepository from './repository/wishlist.interface.repository';
import WishlistInMemoryRepository from './repository/wishlist.in-memory.repository';
import IProductsRepository from '../products/repository/products.interface.repository';
import { ProductsInMemoryRepository } from '../products/repository/products.in-memory.repository';
import DeleteWishlistProductUseCase from './use-cases/DeleteWishlistProduct.use-case';
import WishlistPostgresRepository from './repository/wishlist.postgres.repository';
import ProductsPostgresRepository from '../products/repository/products.postgres.repository';

@Controller('wishlist')
export class WishlistController {
  constructor(
    @Inject('IWishlistRepository') readonly wishlistRepository,
    @Inject('IProductsRepository') readonly productsRepository,
  ) {}

  @Post('add-products')
  async addProductToWishlist(@Req() req) {
    const userId = req.user.id;
    const productsIds = req.body?.productsIds;

    const wishlist = await this.wishlistRepository.findByUserId(userId);
    wishlist.addProducts(productsIds);

    await this.wishlistRepository.save(wishlist);
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

  @Delete('remove-products')
  @HttpCode(204)
  async removeProductFromWishlist(@Req() req) {
    const userId = req.user.id;
    const productsIds = req.body?.productsIds;

    const useCase = new DeleteWishlistProductUseCase(this.wishlistRepository);

    await useCase.execute({ userId, productsIds }).catch((err) => {
      if (err.message.includes('not found'))
        throw new NotFoundException(err.message);
    });
  }
}
