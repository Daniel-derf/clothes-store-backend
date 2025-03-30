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
      const productSizes = {};

      const sizes = availableProductsSizes.filter(
        (size) => size.productId === product.id,
      );

      sizes.forEach((size) => {
        productSizes[size.size] = size.quantity;
      });

      product['availableSizeQtt'] = productSizes;
    }

    if (productsData.length)
      return productsData.map((product) => new Product(product));
  }

  async findById(id: number): Promise<Product> {
    const [productData]: any[] = await connection.query(
      'select * from store.products p where p.id = $1',
      [id],
    );

    const availableProductSizes: any[] = await connection.query(
      'select * from store.available_sizes where "productId" = $1',
      [productData.id],
    );

    const productSizes = {};

    availableProductSizes.forEach((size) => {
      productSizes[size.size] = size.quantity;
    });

    productData['availableSizeQtt'] = productSizes;

    if (productData) return new Product(productData);
  }

  async save(product: Product): Promise<void> {
    if (product.id === 0) {
      await connection.query(
        'insert into store.products (name, price, sex, description, "ratingId", "availableSizeQtt") values ($1, $2, $3, $4, $5, $6)',
        [
          product.name,
          product.price,
          product.sex,
          product.description,
          product.ratingId,
          product.availableSizeQtt,
        ],
      );
    } else {
      await connection.query(
        'update store.products set name=$1, price=$2, sex=$3, description=$4, "ratingId"=$5, "availableSizeQtt" = $6 where id=$7',
        [
          product.name,
          product.price,
          product.sex,
          product.description,
          product.ratingId,
          product.availableSizeQtt,
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
}
