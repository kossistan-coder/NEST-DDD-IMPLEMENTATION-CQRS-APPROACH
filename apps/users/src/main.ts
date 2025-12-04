import * as dotenv from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {

  const port = parseInt(process.env.PORT_USER) ?? 3001;

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UsersModule,
    {
      transport: Transport.TCP,
      options: {
        port: port,
      },
    }
  );
  await app.listen();
}
bootstrap();
