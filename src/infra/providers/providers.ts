import { Provider } from '@nestjs/common';

import UsersPostgresRepository from '../../users/repository/users.postgres.repository';
import WishlistPostgresRepository from '../../wishlist/repository/wishlist.postgres.repository';
import OrdersPostgresRepository from '../../orders/repository/orders.postgres.repository';
import ProductsPostgresRepository from '../../products/repository/products.postgres.repository';
import UsersInMemoryRepository from '../../users/repository/users.in-memory.repository';
import WishlistInMemoryRepository from '../../wishlist/repository/wishlist.in-memory.repository';
import OrdersInMemoryRepository from '../../orders/repository/orders.in-memory.repository';
import { ProductsInMemoryRepository } from '../../products/repository/products.in-memory.repository';

// export const providers: Provider[] = [
//   {
//     provide: 'IUsersRepository',
//     useClass: UsersInMemoryRepository,
//   },
//   {
//     provide: 'IWishlistRepository',
//     useClass: WishlistInMemoryRepository,
//   },
//   {
//     provide: 'IOrdersRepository',
//     useClass: OrdersInMemoryRepository,
//   },
//   {
//     provide: 'IProductsRepository',
//     useClass: ProductsInMemoryRepository,
//   },
// ];

export const providers: Provider[] = [
  {
    provide: 'IUsersRepository',
    useClass: UsersPostgresRepository,
  },
  {
    provide: 'IWishlistRepository',
    useClass: WishlistPostgresRepository,
  },
  {
    provide: 'IOrdersRepository',
    useClass: OrdersPostgresRepository,
  },
  {
    provide: 'IProductsRepository',
    useClass: ProductsPostgresRepository,
  },
];
