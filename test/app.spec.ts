import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Tests by routes using in-memory test repository', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  // Products
  describe('Products tests', () => {
    it('should get all products', () => {
      return request(app.getHttpServer())
        .get('/products')
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
      return request(app.getHttpServer()).get('/products/90').expect(404);
    });

    it('should delete a product by id', async () => {
      await request(app.getHttpServer()).delete('/products/1').expect(204);

      await request(app.getHttpServer()).get('/products/1').expect(404);
    });

    it('should get an error by trying to delete a inexistent product by ID', async () => {
      await request(app.getHttpServer()).delete('/products/999').expect(404);
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
        .send(newProduct)
        .expect(201);

      await request(app.getHttpServer())
        .get('/products/6')
        .expect(200)
        .expect((res) => {
          const product = res.body;

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

    it('should apply a discount to a product by its id', async () => {
      await request(app.getHttpServer())
        .get('/products/1')
        .expect((res) => {
          const product = res.body;

          expect(product.price).toEqual(100);
        });

      await request(app.getHttpServer())
        .patch('/products/1/apply-discount')
        .send({ discount: 15 });

      await request(app.getHttpServer())
        .get('/products/1')
        .expect((res) => {
          const product = res.body;

          expect(product.price).toEqual(85);
        });
    });
  });

  // Authentication
  describe('Authentication tests', () => {
    it('should allow access to protected route with valid JWT', async () => {
      const authData = {
        email: 'teste@email.com',
        password: 'TesteSenhaForte@123987!',
      };

      const loginResponse = await request(app.getHttpServer())
        .post('/auth/login')
        .send(authData)
        .expect(200);

      const { jwt } = loginResponse.body;

      await request(app.getHttpServer())
        .get('/users/1/orders')
        .set('Authorization', `Bearer ${jwt}`)
        .expect(200);
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

  // Users
  describe('Users tests', () => {
    it('should get all users', async () => {
      await request(app.getHttpServer())
        .get('/users')
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

  // Orders
  describe('Orders tests', () => {
    it('should get all orders', async () => {
      await request(app.getHttpServer())
        .get('/orders')
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

    it('should get all user orders', async () => {
      await request(app.getHttpServer())
        .get('/users/1/orders')
        .expect(200)
        .expect((res) => {
          const orders = res.body;

          expect(orders.length).toBeGreaterThan(0);

          orders.forEach((order) => {
            expect(order).toHaveProperty('id');
            expect(order).toHaveProperty('userId', 1);
            expect(order).toHaveProperty('productsIds');
            expect(order).toHaveProperty('totalPrice');
            expect(order).toHaveProperty('status');
          });
        });
    });

    it('should get one specific user order', async () => {
      await request(app.getHttpServer())
        .get('/users/1/orders/1')
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

    it('should make a new user order', async () => {
      const newOrder = {
        userId: 1,
        productsIds: [1, 2],
        totalPrice: 300,
        status: 'PREPARATION',
      };

      await request(app.getHttpServer())
        .post('/users/1/orders')
        .send(newOrder)
        .expect(201);

      await request(app.getHttpServer())
        .get('/users/1/orders')
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
      // status: cancelled, transport, preparation, awaiting payment, awaiting pickup

      const newStatus = 'AWAITING_PICKUP';

      await request(app.getHttpServer())
        .patch('/users/1/orders/1/update-status')
        .send({ status: newStatus })
        .expect(200);

      await request(app.getHttpServer())
        .get('/users/1/orders/1')
        .expect(200)
        .expect((res) => {
          const order = res.body;

          expect(order).toHaveProperty('id', 1);
          expect(order).toHaveProperty('userId', 1);
          expect(order).toHaveProperty('status', newStatus);
        });
    });
  });

  // Authorization
  describe('Authorization tests', () => {
    it('should not allow access to other user data with valid JWT', async () => {
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
        .get('/users/1/orders')
        .set('Authorization', `Bearer ${jwt}`)
        .expect(403);
    });
  });
});
