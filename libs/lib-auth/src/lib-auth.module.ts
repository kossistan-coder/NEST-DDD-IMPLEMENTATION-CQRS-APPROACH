import { Module } from '@nestjs/common';
import { LibAuthService } from './lib-auth.service';

@Module({
  providers: [LibAuthService],
  exports: [LibAuthService],
})
export class LibAuthModule {}
