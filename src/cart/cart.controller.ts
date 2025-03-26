import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Inject,
  InternalServerErrorException,
  NotFoundException,
  Post,
  Req,
} from '@nestjs/common';
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

    await useCase.execute(input).catch((err) => {
      const errorMsg: string = err.message;

      if (errorMsg.includes('Invalid product quantity')) {
        throw new BadRequestException(errorMsg);
      }
      if (errorMsg.includes('product was not found'))
        throw new NotFoundException(errorMsg);

      throw new InternalServerErrorException(errorMsg);
    });
  }

  @Post('remove-item')
  async removeItem(@Req() req, @Body() { productId }) {
    const useCase = new AddCartItemUseCase(
      this.cartRepository,
      this.productsRepository,
    );

    const input = {
      userId: req.user.id,
      productId,
    };

    // await useCase.execute(input).catch((err) => {
    //   const errorMsg: string = err.message;

    //   if (errorMsg.includes('Invalid product quantity')) {
    //     throw new BadRequestException(errorMsg);
    //   }
    //   if (errorMsg.includes('product was not found'))
    //     throw new NotFoundException(errorMsg);

    //   throw new InternalServerErrorException(errorMsg);
    // });
  }

  @Get('products')
  async getCartProducts(@Req() req) {
    const useCase = new GetCartProductsUseCase(this.cartRepository);

    const input = req.user.id;

    const output = await useCase.execute(input);

    return output;
  }
}
