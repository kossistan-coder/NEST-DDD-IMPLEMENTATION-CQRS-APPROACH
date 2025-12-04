import { Module } from '@nestjs/common';
import { UsersController } from './presentation/controllers/users.controller';
import { LibUsersModule } from '@app/lib-users';
import { LibAuthModule } from '@app/lib-auth';

@Module({
  imports: [
    LibUsersModule,
    LibAuthModule,
  ],
  controllers: [UsersController],
  providers: [],
})
export class UsersModule { }
