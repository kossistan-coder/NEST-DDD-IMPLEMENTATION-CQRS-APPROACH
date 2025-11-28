import { Module } from '@nestjs/common';
import { LibUserApplicationModule } from './application/lib-user-application.module';

@Module({
  imports: [
    LibUserApplicationModule
  ],
  providers: [],
  exports: [LibUserApplicationModule],
})
export class LibUsersModule { }
