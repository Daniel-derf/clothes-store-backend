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
} from '@nestjs/common';

// dtos
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

// use cases
import FindAllProductsUseCase from './use-cases/FindAllProducts.use-case';
import RegisterProductUseCase from './use-cases/RegisterProduct.use-case';

// repositories
import { InMemoryProductsRepository } from './repository/products.in-memory.repository';
import IProductsRepository from './repository/products.interface.repository';
import FindOneProductUseCase from './use-cases/FindOneProduct.use-case';
import DeleteProductByIdUseCase from './use-cases/DeleteProductById.use-case';

// utils
import httpErrorHandler from '../utils/http-error-handler';

@Controller('products')
export class ProductsController {
  private repository: IProductsRepository = new InMemoryProductsRepository();

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

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    const useCase = new RegisterProductUseCase(this.repository);

    await useCase.execute(createProductDto);
  }

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
