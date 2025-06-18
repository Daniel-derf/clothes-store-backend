import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  NotFoundException,
  Post,
  Req,
} from '@nestjs/common';

import DeleteWishlistProductUseCase from './use-cases/DeleteWishlistProduct.use-case';
import { AddProductToWishlistDto } from './dto/add-product-to-wishlist.dto';
import Wishlist from './entities/wishlist.entity';
import { RemoveFromWishlistDto } from './dto/remove-product-from-wishlist.dto';

@Controller('wishlist')
export class WishlistController {
  constructor(
    @Inject('IWishlistRepository') readonly wishlistRepository,
    @Inject('IProductsRepository') readonly productsRepository,
  ) {}

  @Post('add-products')
  async addProductToWishlist(
    @Req() req,
    @Body() { productsIds }: AddProductToWishlistDto,
  ) {
    const userId = req.user.id;

    const wishlist: Wishlist =
      await this.wishlistRepository.findByUserId(userId);

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
  async removeProductFromWishlist(
    @Req() req,
    @Body() { productsIds }: RemoveFromWishlistDto,
  ) {
    const userId = req.user.id;

    const useCase = new DeleteWishlistProductUseCase(this.wishlistRepository);

    await useCase.execute({ userId, productsIds }).catch((err) => {
      if (err.message.includes('not found'))
        throw new NotFoundException(err.message);
    });
  }
}
