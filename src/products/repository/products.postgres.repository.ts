import { connection } from '../../infra/database/psql-connection';
import { Product } from '../entities/product.entity';
import IProductsRepository from './products.interface.repository';

export default class ProductsPostgresRepository implements IProductsRepository {
  async findAll(): Promise<Product[]> {
    const productsData: any[] = await connection.query(
      'SELECT * from store.products',
    );

    const availableProductsSizes: any[] = await connection.query(
      'select * from store.available_sizes',
    );

    for (const product of productsData) {
      const sizes = availableProductsSizes.filter(
        (size) => size.productId === product.id,
      );

      const availableSize = this.availableSizesToProductEntity(sizes);

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
      const { id } = await connection.one(
        'insert into store.products (name, price, sex, description, "ratingId") values ($1, $2, $3, $4, $5) returning id',
        [
          product.name,
          product.price,
          product.sex,
          product.description,
          product.ratingId,
        ],
      );

      if (product.availableSizeQtt) {
        for (const [size, quantity] of Object.entries(
          product.availableSizeQtt,
        )) {
          await connection.query(
            'insert into store.available_sizes ("productId", size, quantity) values ($1, $2, $3)',
            [id, size, quantity],
          );
        }
      }

      return;
    }

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

    if (product.availableSizeQtt) {
      await connection.query(
        'delete from store.available_sizes where "productId" = $1',
        [product.id],
      );

      for (const [size, quantity] of Object.entries(product.availableSizeQtt)) {
        await connection.query(
          'insert into store.available_sizes ("productId", size, quantity) values ($1, $2, $3)',
          [product.id, size, quantity],
        );
      }
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
