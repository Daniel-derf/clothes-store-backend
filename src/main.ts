import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

/*
eventos: 
* payments dispara o evento de pedido pago para orders 

* orders então muda o status para preparation e dispara o evento contendo os itens a serem enviados
para o transports

* orders aguarda o evento de em transporte de transports e atualiza seu status para in_transport, bem como
recebe nesse mesmo evento o link de rastreio para disponibilizá-lo

* orders então aguarda o evento de transports dizendo que o pedido chegou com sucesso e atualiza seu status de acordo com isso
*/
