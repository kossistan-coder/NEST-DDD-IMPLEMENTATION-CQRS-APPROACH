import { Module } from '@nestjs/common';
import { LibUsersService } from './lib-users.service';

@Module({
  providers: [LibUsersService],
  exports: [LibUsersService],
})
export class LibUsersModule {}
