import { Module } from '@nestjs/common';
import { LibCoreService } from './lib-core.service';

@Module({
  providers: [LibCoreService],
  exports: [LibCoreService],
})
export class LibCoreModule {}
