import { Module, Global } from '@nestjs/common';
import { providers } from './providers';

@Global()
@Module({
  providers: [...providers],
  exports: [...providers],
})
export class ProvidersModule {}
