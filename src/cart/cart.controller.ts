import { Body, Controller, Get, Inject, Post, Req } from '@nestjs/common';
import AddCartItemUseCase from './use-cases/AddCartItemUseCase';
import GetCartProductsUseCase from './use-cases/GetCartProductsUseCase';

@Controller('cart')
export class CartController {
  constructor(
    @Inject('ICartRepository') readonly cartRepository,
    @Inject('IProductsRepository') readonly productsRepository,
  ) {}

  @Post('add-item')
  async addItem(
    @Req() req,
    @Body() { productId, productSize, productQuantity },
  ) {
    const useCase = new AddCartItemUseCase(
      this.cartRepository,
      this.productsRepository,
    );

    const input = {
      userId: req.user.id,
      productId,
      productSize,
      productQuantity,
    };

    await useCase.execute(input);
  }

  @Get('products')
  async getCartProducts(@Req() req) {
    const useCase = new GetCartProductsUseCase(this.cartRepository);

    const input = req.user.id;

    const output = await useCase.execute(input);

    return output;
  }
}
