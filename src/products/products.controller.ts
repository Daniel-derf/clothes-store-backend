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
import FindAllProductsUseCase from './use-cases/findAllProducts.use-case';

// repositories
import { InMemoryProductsRepository } from './repository/products.in-memory.repository';
import IProductsRepository from './repository/products.interface.repository';
import FindOneProductUseCase from './use-cases/findOneProduct.use-case';

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

  @Delete(':id')
  @HttpCode(204)
  async deleteById(@Param() { id }) {
    const product = await this.repository.findById(+id);

    if (product) await this.repository.delete(+id);
    else throw new NotFoundException(`The product ${id} was not found`);
  }
}
