import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { LibUsersModule } from '@app/lib-users';

@Module({
  imports: [
    LibUsersModule
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule { }
