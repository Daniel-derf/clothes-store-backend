import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { OrdersModule } from './orders/orders.module';

import { AuthMiddleware } from './auth/auth.middleware';
import { WishlistModule } from './wishlist/wishlist.module';
import { CartModule } from './cart/cart.module';

import { ProvidersModule } from './infra/providers/providers.module';
import { TransportsModule } from './transports/transports.module';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [
    ProductsModule,
    UsersModule,
    AuthModule,
    OrdersModule,
    WishlistModule,
    CartModule,
    ProvidersModule,
    TransportsModule,
    PaymentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude({ path: 'auth/(.*)', method: RequestMethod.ALL })
      .forRoutes('*');
  }
}
