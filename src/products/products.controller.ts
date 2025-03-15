import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  HttpCode,
  UseGuards,
} from '@nestjs/common';

// dtos
import { CreateProductDto } from './dto/create-product.dto';

// use cases
import FindAllProductsUseCase from './use-cases/FindAllProducts.use-case';
import RegisterProductUseCase from './use-cases/RegisterProduct.use-case';

// repositories
import { ProductsInMemoryRepository } from './repository/products.in-memory.repository';
import IProductsRepository from './repository/products.interface.repository';
import FindOneProductUseCase from './use-cases/FindOneProduct.use-case';
import DeleteProductByIdUseCase from './use-cases/DeleteProductById.use-case';

// utils
import httpErrorHandler from '../utils/http-error-handler';
import ApplyProductDiscountUseCase from './use-cases/ApplyProductDiscount.use-case';

// guards
import { OnlyAdminGuard } from '../authorization/authorization.guard';
import ProductsPostgresRepository from './repository/products.postgres.repository';

@Controller('products')
export class ProductsController {
  private repository: IProductsRepository = new ProductsPostgresRepository();

  @Get()
  async findAll() {
    const useCase = new FindAllProductsUseCase(this.repository);

    const output = await useCase.execute();

    return output;
  }

  @Get(':id')
  async findOne(@Param() { id }) {
    const useCase = new FindOneProductUseCase(this.repository);

    const output = await useCase.execute(+id);

    if (!output) throw new NotFoundException(`The product ${id} was not found`);

    return output;
  }

  @UseGuards(OnlyAdminGuard)
  @Patch(':id/apply-discount')
  async applyDiscount(@Param() { id }, @Body() { discount }) {
    const useCase = new ApplyProductDiscountUseCase(this.repository);

    await useCase.execute(+id, discount);
  }

  @UseGuards(OnlyAdminGuard)
  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    const useCase = new RegisterProductUseCase(this.repository);

    await useCase.execute(createProductDto);
  }

  @UseGuards(OnlyAdminGuard)
  @Delete(':id')
  @HttpCode(204)
  async deleteById(@Param() { id }) {
    try {
      const useCase = new DeleteProductByIdUseCase(this.repository);
      await useCase.execute(+id);
    } catch (error) {
      httpErrorHandler(error);
    }
  }
}
