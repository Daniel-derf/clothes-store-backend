import { Body, Controller, Inject, Post, Req } from '@nestjs/common';
import AddCartItemUseCase from './use-cases/AddCartItemUseCase';

@Controller('cart')
export class CartController {
  constructor(
    @Inject('ICartRepository') readonly cartRepository,
    @Inject('IProductsRepository') readonly productsRepository,
  ) {}

  @Post('add-item')
  async addItem(@Req() req, @Body() { productId, productSize, quantity }) {
    const useCase = new AddCartItemUseCase(
      this.cartRepository,
      this.productsRepository,
    );

    const input = {
      userId: req.user.id,
      productId,
      productSize,
      quantity,
    };

    await useCase.execute(input);
  }
}
