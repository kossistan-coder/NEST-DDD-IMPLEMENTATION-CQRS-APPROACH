import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MAIN_DATABASE_CONNECTION_NAME } from './constants/databases';
import { validateUserAppConfig } from './config/user.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      validate: validateUserAppConfig,
      envFilePath: [".env", ".env.development", "apps/users/.env", "apps/users/.env.development"],
    }),
    MongooseModule.forRoot(process.env.USER_MAIN_DATABASE_URI, {
      connectionName: MAIN_DATABASE_CONNECTION_NAME,
    }),
  ],
  providers: [],
  exports: [MongooseModule, ConfigModule],
})
export class LibCoreModule { }
