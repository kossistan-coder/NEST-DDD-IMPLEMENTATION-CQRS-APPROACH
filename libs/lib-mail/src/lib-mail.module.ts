import { Module } from '@nestjs/common';
import { LibMailService } from './lib-mail.service';

@Module({
  providers: [LibMailService],
  exports: [LibMailService],
})
export class LibMailModule {}
