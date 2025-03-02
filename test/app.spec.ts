import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

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
});
