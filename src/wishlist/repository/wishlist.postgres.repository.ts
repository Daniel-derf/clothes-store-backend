import Wishlist from '../entities/wishlist.entity';
import IWishlistRepository from './wishlist.interface.repository';
import * as pgPromise from 'pg-promise';

const PSQL_URL =
  process.env.PSQL_URL ?? 'postgres://user:123456@localhost:5432/store';

const pgp = pgPromise();
const connection = pgp(PSQL_URL);

export default class WishlistPostgresRepository implements IWishlistRepository {
  async findByUserId(userId: number): Promise<Wishlist> {
    const [wishlistData] = await connection.query(
      'select * from store.wishlist w where w."userId" = $1',
      [userId],
    );

    return new Wishlist(wishlistData);
  }

  async save(wishlist: Wishlist): Promise<void> {
    if (wishlist.id === 0) {
      await connection.query(
        'insert into store.wishlist ("userId", "productsIds") values ($1, $2)',
        [wishlist.userId, wishlist.productsIds],
      );

      return;
    }

    await connection.query(
      'update store.wishlist set productsIds=$1, userId=$2',
      [wishlist.productsIds, wishlist.userId],
    );
  }
}
