import { Product } from '../entities/product.entity';
import IProductsRepository from './products.interface.repository';

import * as pgPromise from 'pg-promise';

const PSQL_URL =
  process.env.PSQL_URL ?? 'postgres://user:123456@localhost:5432/store';

const pgp = pgPromise();
const connection = pgp(PSQL_URL);

export default class ProductsPostgresRepository implements IProductsRepository {
  async findAll(): Promise<Product[]> {
    const productsData: any[] = await connection.query(
      'SELECT * from store.products',
    );

    const availableProductsSizes: any[] = await connection.query(
      'select * from store.available_sizes',
    );

    for (const product of productsData) {
      const availableSize = this.availableSizesToProductEntity(
        availableProductsSizes,
      );

      product['availableSizeQtt'] = availableSize;
    }

    if (productsData.length)
      return productsData.map((product) => new Product(product));
  }

  async findById(id: number): Promise<Product> {
    const [productData]: any[] = await connection.query(
      'select * from store.products p where p.id = $1',
      [id],
    );

    if (!productData) return undefined;

    const availableProductSizes: any[] = await connection.query(
      'select * from store.available_sizes where "productId" = $1',
      [productData.id],
    );

    productData['availableSizeQtt'] = this.availableSizesToProductEntity(
      availableProductSizes,
    );

    if (productData) return new Product(productData);
  }

  async save(product: Product): Promise<void> {
    if (product.id === 0) {
      await connection.query(
        'insert into store.products (name, price, sex, description, "ratingId") values ($1, $2, $3, $4, $5)',
        [
          product.name,
          product.price,
          product.sex,
          product.description,
          product.ratingId,
        ],
      );
    } else {
      await connection.query(
        'update store.products set name=$1, price=$2, sex=$3, description=$4, "ratingId"=$5 where id=$6',
        [
          product.name,
          product.price,
          product.sex,
          product.description,
          product.ratingId,
          product.id,
        ],
      );
    }
  }

  async delete(productId: number): Promise<void> {
    await connection.query('delete from store.products p where p.id=$1', [
      productId,
    ]);
  }

  private availableSizesToProductEntity(sizes: any[]) {
    const productSizes = {};

    sizes.forEach((size) => {
      productSizes[size.size] = size.quantity;
    });

    return productSizes;
  }
}
