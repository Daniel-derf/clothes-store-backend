import { Provider } from '@nestjs/common';

import UsersPostgresRepository from '../../users/repository/users.postgres.repository';
import WishlistPostgresRepository from '../../wishlist/repository/wishlist.postgres.repository';
import OrdersPostgresRepository from '../../orders/repository/orders.postgres.repository';
import ProductsPostgresRepository from '../../products/repository/products.postgres.repository';
import CartInMemoryRepository from '../../cart/repository/cart.in-memory.repository';

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
  { provide: 'ICartRepository', useClass: CartInMemoryRepository },
];
