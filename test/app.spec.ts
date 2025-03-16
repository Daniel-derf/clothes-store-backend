import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import * as fs from 'fs';
import * as path from 'path';
import { AppModule } from '../src/app.module';

import { connection } from '../src/infra/database/psql-connection';

describe('HTTP Integration Tests', () => {
  let app: INestApplication;
  let token: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const loginRes = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'teste4@email.com',
        password: 'TesteSenhaForte@123987!',
      });

    const { jwt } = loginRes.body;
    token = jwt;
  });

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  // reset db before each
  beforeEach(async () => {
    try {
      const RESET_DB_COMMAND = fs
        .readFileSync(path.resolve(__dirname, '../init.sql'))
        .toString();

      await connection.none(RESET_DB_COMMAND);
    } catch (error) {}
  });

  describe('Products tests', () => {
    it('should get all products', () => {
      return request(app.getHttpServer())
        .get('/products')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body));
          const products = res.body;

          products.forEach((product) => {
            expect(product).toHaveProperty('id');
            expect(product).toHaveProperty('name');
            expect(product).toHaveProperty('price');
            expect(product).toHaveProperty('sex');
            expect(product).toHaveProperty('description');
            expect(product).toHaveProperty('ratingId');
            expect(product).toHaveProperty('availableSizeQtt');
          });
        });
    });

    it('should get one product by ID', () => {
      return request(app.getHttpServer())
        .get('/products/1')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .expect((res) => {
          const product = res.body;

          expect(product).toHaveProperty('id');
          expect(product).toHaveProperty('name');
          expect(product).toHaveProperty('price');
          expect(product).toHaveProperty('sex');
          expect(product).toHaveProperty('description');
          expect(product).toHaveProperty('ratingId');
          expect(product).toHaveProperty('availableSizeQtt');
        });
    });

    it('should get an error by trying to get a inexistent product by ID', () => {
      return request(app.getHttpServer())
        .get('/products/90')
        .set('Authorization', `Bearer ${token}`)
        .expect(404);
    });

    it('should delete a product by id', async () => {
      await request(app.getHttpServer())
        .delete('/products/1')
        .set('Authorization', `Bearer ${token}`)
        .expect(204);

      await request(app.getHttpServer())
        .get('/products/1')
        .set('Authorization', `Bearer ${token}`)
        .expect(404);
    });

    it('should apply a discount to a product by its id', async () => {
      await request(app.getHttpServer())
        .get('/products/1')
        .set('Authorization', `Bearer ${token}`)
        .expect((res) => {
          const product = res.body;

          expect(product.price).toEqual(100);
        });

      await request(app.getHttpServer())
        .patch('/products/1/apply-discount')
        .set('Authorization', `Bearer ${token}`)
        .send({ discount: 15 });

      await request(app.getHttpServer())
        .get('/products/1')
        .set('Authorization', `Bearer ${token}`)
        .expect((res) => {
          const product = res.body;

          expect(product.price).toEqual(85);
        });
    });

    it('should get an error by trying to delete a inexistent product by ID', async () => {
      await request(app.getHttpServer())
        .delete('/products/999')
        .set('Authorization', `Bearer ${token}`)
        .expect(404);
    });

    it('should register a new product', async () => {
      const newProduct = {
        name: 'New Product',
        price: 150,
        sex: 'M',
        description: 'New product description',
        ratingId: 1,
        availableSizeQtt: { gg: 10 },
      };

      await request(app.getHttpServer())
        .post('/products')
        .set('Authorization', `Bearer ${token}`)
        .send(newProduct)
        .expect(201);

      await request(app.getHttpServer())
        .get('/products')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .expect((res) => {
          const product = res.body[res.body.length - 1];

          expect(product).toHaveProperty('id');
          expect(product).toHaveProperty('name', newProduct.name);
          expect(product).toHaveProperty('price', newProduct.price);
          expect(product).toHaveProperty('sex', newProduct.sex);
          expect(product).toHaveProperty('description', newProduct.description);
          expect(product).toHaveProperty('ratingId', newProduct.ratingId);
          expect(product).toHaveProperty(
            'availableSizeQtt',
            newProduct.availableSizeQtt,
          );
        });
    });
  });

  describe('Authentication tests', () => {
    it('should not allow access to private route without JWT', async () => {
      await request(app.getHttpServer()).get('/orders').expect(401);
    });

    it('should get a JWT by doing login', async () => {
      const authData = {
        email: 'teste@email.com',
        password: 'TesteSenhaForte@123987!',
      };

      await request(app.getHttpServer())
        .post('/auth/login')
        .send(authData)
        .expect((res) => {
          const { jwt } = res.body;

          expect(jwt).toBeDefined();
          expect(jwt.length).toBeGreaterThan(5);
        });
    });

    it('should not get a JWT by doing login with incorrect credentials', async () => {
      const authData = {
        email: 'teste@email.com',
        password: 'incorrect password',
      };

      await request(app.getHttpServer())
        .post('/auth/login')
        .send(authData)
        .expect((res) => {
          const { jwt } = res.body;

          expect(jwt).toBeUndefined();
        });
    });

    it('should register a new client', async () => {
      const createUserDto = {
        email: 'john@mail.com',
        password: 'StrongPassword@1256!',
        name: 'John Doe',
      };

      await request(app.getHttpServer())
        .post('/auth/register')
        .send(createUserDto)
        .expect(201);

      const { password, email } = createUserDto;

      await request(app.getHttpServer())
        .post('/auth/login')
        .send({ password, email })
        .expect((res) => {
          const { jwt } = res.body;

          expect(jwt).toBeUndefined();
        });
    });

    it('should not allow access to protected route without JWT', async () => {
      await request(app.getHttpServer()).get('/users/1/orders').expect(401);
    });

    it('should not allow access to protected route with invalid JWT', async () => {
      await request(app.getHttpServer())
        .get('/users/1/orders')
        .set('Authorization', 'Bearer invalid.jwt.token')
        .expect(403);
    });
  });

  describe('Users tests', () => {
    it('should get all users', async () => {
      await request(app.getHttpServer())
        .get('/users')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .expect((res) => {
          const users = res.body;

          expect(users.length).toBeGreaterThan(0);

          users.forEach((user) => {
            expect(user).toHaveProperty('id');
            expect(user).toHaveProperty('name');
            expect(user).toHaveProperty('email');
            expect(user).toHaveProperty('ordersIds');
            expect(user).toHaveProperty('ratingsIds');
            expect(user).toHaveProperty('addressesIds');
          });
        });
    });

    it('should get one user by ID', async () => {
      await request(app.getHttpServer())
        .get('/users/1')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .expect((res) => {
          const user = res.body;

          expect(user).toHaveProperty('id');
          expect(user).toHaveProperty('name');
          expect(user).toHaveProperty('email');
          expect(user).toHaveProperty('ordersIds');
          expect(user).toHaveProperty('ratingsIds');
        });
    });
  });

  describe('Orders tests', () => {
    it('should get all user orders', async () => {
      await request(app.getHttpServer())
        .get('/orders')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .expect((res) => {
          const orders = res.body;
          expect(orders.length).toBeGreaterThan(0);

          orders.forEach((order) => {
            expect(order).toHaveProperty('id');
            expect(order).toHaveProperty('userId');
            expect(order).toHaveProperty('productsIds');
            expect(order).toHaveProperty('totalPrice');
            expect(order).toHaveProperty('status');
          });
        });
    });

    it('should get one specific order', async () => {
      await request(app.getHttpServer())
        .get('/orders/1')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .expect((res) => {
          const order = res.body;

          expect(order).toHaveProperty('id', 1);
          expect(order).toHaveProperty('userId', 1);
          expect(order).toHaveProperty('productsIds');
          expect(order).toHaveProperty('totalPrice');
          expect(order).toHaveProperty('status');
        });
    });

    it('should make a new order', async () => {
      const newOrder = {
        userId: 4,
        productsIds: [1, 2],
        totalPrice: 300,
        status: 'PREPARATION',
      };

      await request(app.getHttpServer())
        .post('/orders/create-order')
        .set('Authorization', `Bearer ${token}`)
        .send(newOrder)
        .expect(201);

      await request(app.getHttpServer())
        .get('/orders')
        .set('Authorization', `Bearer ${token}`)
        .expect((res) => {
          const orders = res.body;

          const order = orders[orders.length - 1];

          expect(order).toHaveProperty('id');
          expect(order).toHaveProperty('userId', newOrder.userId);
          expect(order).toHaveProperty('productsIds', newOrder.productsIds);
          expect(order).toHaveProperty('totalPrice', newOrder.totalPrice);
          expect(order).toHaveProperty('status', newOrder.status);
        });
    });

    it('should update a order status', async () => {
      const newStatus = 'AWAITING_PICKUP';

      await request(app.getHttpServer())
        .patch('/orders/4/update-status')
        .set('Authorization', `Bearer ${token}`)
        .send({ status: newStatus })
        .expect(200);

      await request(app.getHttpServer())
        .get('/orders/4')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .expect((res) => {
          const order = res.body;

          expect(order).toHaveProperty('id', 4);
          expect(order).toHaveProperty('userId', 4);
          expect(order).toHaveProperty('status', newStatus);
        });
    });
  });

  describe('Authorization tests', () => {
    it('should not allow a client to access a admin-only route', async () => {
      const authData = {
        email: 'teste2@email.com',
        password: 'TesteSenhaForte@123987!',
      };

      const loginResponse = await request(app.getHttpServer())
        .post('/auth/login')
        .send(authData)
        .expect(200);

      const { jwt } = loginResponse.body;

      await request(app.getHttpServer())
        .get('/users')
        .set('Authorization', `Bearer ${jwt}`)
        .expect(403);
    });
  });

  describe('Wishlist tests', () => {
    it('should get all products in the wishlist', async () => {
      await request(app.getHttpServer())
        .get('/wishlist/products')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .expect((res) => {
          const products = res.body;
          expect(Array.isArray(products)).toBe(true);

          products.forEach((product: unknown) => {
            expect(product).toHaveProperty('id');
            expect(product).toHaveProperty('name');
            expect(product).toHaveProperty('price');
            expect(product).toHaveProperty('sex');
            expect(product).toHaveProperty('description');
            expect(product).toHaveProperty('ratingId');
            expect(product).toHaveProperty('availableSizeQtt');
          });
        });
    });

    it('should add a product to the wishlist', async () => {
      const PRODUCT_ID = 3;

      await request(app.getHttpServer())
        .get('/wishlist/products')
        .set('Authorization', `Bearer ${token}`)
        .expect((res) => {
          const products: any[] = res.body;
          expect(Array.isArray(products)).toBe(true);

          const product = products.find((product) => product.id === PRODUCT_ID);

          expect(product).toBeUndefined();
        });

      await request(app.getHttpServer())
        .post('/wishlist/add-products')
        .set('Authorization', `Bearer ${token}`)
        .send({ productsIds: [PRODUCT_ID] })
        .expect(201);

      await request(app.getHttpServer())
        .get('/wishlist/products')
        .set('Authorization', `Bearer ${token}`)
        .expect((res) => {
          const products = res.body;
          expect(Array.isArray(products)).toBe(true);

          const product = products.find((product) => product.id === PRODUCT_ID);

          expect(product).toHaveProperty('id');
          expect(product).toHaveProperty('name');
          expect(product).toHaveProperty('price');
          expect(product).toHaveProperty('sex');
          expect(product).toHaveProperty('description');
          expect(product).toHaveProperty('ratingId');
          expect(product).toHaveProperty('availableSizeQtt');
        });
    });

    it('should remove a product from the wishlist', async () => {
      const PRODUCT_ID = 1;

      await request(app.getHttpServer())
        .get('/wishlist/products')
        .set('Authorization', `Bearer ${token}`)
        .expect((res) => {
          const products: any[] = res.body;
          expect(Array.isArray(products)).toBe(true);

          const product = products.find((product) => product.id === PRODUCT_ID);

          expect(product).toBeDefined();
        });

      await request(app.getHttpServer())
        .delete('/wishlist/remove-products')
        .set('Authorization', `Bearer ${token}`)
        .send({ productsIds: [PRODUCT_ID] })
        .expect(204);

      await request(app.getHttpServer())
        .get('/wishlist/products')
        .set('Authorization', `Bearer ${token}`)
        .expect((res) => {
          const products: any[] = res.body;
          expect(Array.isArray(products)).toBe(true);

          const product = products.find((product) => product.id === PRODUCT_ID);

          expect(product).toBeUndefined();
        });
    });

    it('should return 404 if trying to remove a non-existent product from wishlist', async () => {
      await request(app.getHttpServer())
        .delete('/wishlist/remove-products')
        .set('Authorization', `Bearer ${token}`)
        .send({ productsIds: [9999] }) // ID que não existe
        .expect(404);
    });
  });

  describe('Cart tests', () => {
    it('should return 400 if trying to add a product with invalid quantity', async () => {
      await request(app.getHttpServer())
        .post('/cart/add-item')
        .set('Authorization', `Bearer ${token}`)
        .send({ productId: 1, productQuantity: 0 }) // Quantidade inválida
        .expect(400);
    });

    it('should add a product to the cart', async () => {
      await request(app.getHttpServer())
        .post('/cart/add-item')
        .set('Authorization', `Bearer ${token}`)
        .send({ productId: 1, productSize: 'gg', productQuantity: 2 })
        .expect(201);
    });

    it('should get all products in the cart', async () => {
      const input = { productId: 1, productSize: 'gg', productQuantity: 2 };

      await request(app.getHttpServer())
        .post('/cart/add-item')
        .set('Authorization', `Bearer ${token}`)
        .send(input)
        .expect(201);

      await request(app.getHttpServer())
        .get('/cart/products')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .expect((res) => {
          const products = res.body;

          expect(Array.isArray(products)).toBe(true);

          products.forEach((product: unknown) => {
            expect(product).toHaveProperty('productId', input.productId);
            expect(product).toHaveProperty(
              'productQuantity',
              input.productQuantity,
            );
            expect(product).toHaveProperty('productSize', input.productSize);
          });
        });
    });

    it('should remove a product from the cart', async () => {
      await request(app.getHttpServer())
        .delete('/cart/remove-item')
        .set('Authorization', `Bearer ${token}`)
        .send({ productId: 1, quantity: 2 })
        .expect(204);
    });

    it('should return 404 if trying to remove a non-existent product from the cart', async () => {
      await request(app.getHttpServer())
        .delete('cart/remove-item')
        .set('Authorization', `Bearer ${token}`)
        .send({ productId: 9999, quantity: 1 }) // ID inexistente
        .expect(404);
    });
  });
});
