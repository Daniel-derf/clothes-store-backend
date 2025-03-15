import Order from '../entities/order.entity';
import IOrdersRepository from './orders.interface.repository';

import * as pgPromise from 'pg-promise';

const PSQL_URL = process.env.PSQL_URL;

const pgp = pgPromise();

export default class OrdersPostgresRepository implements IOrdersRepository {
  async findById(id: number): Promise<Order> {
    const connection = pgp(PSQL_URL);

    const [orderData] = await connection.query(
      `SELECT * FROM store.orders o WHERE o.id = $1`,
      [id],
    );

    await connection.$pool.end();

    return orderData ? new Order(orderData) : null;
  }

  async findAll(): Promise<Order[]> {
    const connection = pgp(PSQL_URL);

    const ordersData = await connection.query(`SELECT * FROM store.orders`);
    await connection.$pool.end();

    return ordersData.map((order) => new Order(order));
  }

  async findAllByUserId(userId: number): Promise<Order[]> {
    const connection = pgp(PSQL_URL);

    const ordersData: any[] = await connection.query(
      `SELECT * FROM store.orders o WHERE o."userId" = $1`,
      [userId],
    );

    await connection.$pool.end();

    return ordersData.map(
      (order) =>
        new Order({
          ...order,
        }),
    );
  }

  async findOneByUserId(userId: number, orderId: number): Promise<Order> {
    const connection = pgp(PSQL_URL);

    const [orderData] = await connection.query(
      `SELECT * FROM store.orders o WHERE "userId" = $1 AND o.id = $2`,
      [userId, orderId],
    );
    await connection.$pool.end();

    return orderData ? new Order(orderData) : null;
  }

  async save(order: Order): Promise<void> {
    const connection = pgp(PSQL_URL);

    if (order.id === 0) {
      await connection.query(
        `INSERT INTO store.orders ("userId", "productsIds", "totalPrice", status) VALUES ($1, $2, $3, $4)`,
        [order.userId, order.productsIds, order.totalPrice, order.status],
      );
    } else {
      await connection.query(
        `UPDATE store.orders SET "productsIds" = $1, "totalPrice" = $2, status = $3 WHERE id = $4`,
        [order.productsIds, order.totalPrice, order.status, order.id],
      );
    }

    await connection.$pool.end();
  }
}
