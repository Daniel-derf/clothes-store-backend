// repositories
import { CreateProductDto } from '../dto/create-product.dto';
import { Product } from '../entities/product.entity';
import IProductsRepository from '../repository/products.interface.repository';

export default class RegisterProductUseCase {
  constructor(readonly productsRepository: IProductsRepository) {}

  async execute(registerProductDto: CreateProductDto) {
    const { name, price, sex, description, image_url, availableSizeQtt } =
      registerProductDto;

    const product = new Product({
      id: 0,
      name,
      price,
      sex,
      description,
      ratingId: 0,
      image_url,
      availableSizeQtt,
    });

    await this.productsRepository.save(product);

    return product;
  }
}
