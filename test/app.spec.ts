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

  // Authentication
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

  // Users
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

  // Orders
  it('should get all orders', async () => {});

  it('should get all user orders', async () => {});

  it('should get one specific user order', async () => {});

  it('should make a new user order', async () => {});
});
