import { Module } from '@nestjs/common';
// import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';

@Module({
  controllers: [ProductsController],
  providers: [],
})
export class ProductsModule {}
