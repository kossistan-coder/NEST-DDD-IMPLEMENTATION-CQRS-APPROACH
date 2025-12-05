import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

async function bootstrap() {

  const port = parseInt(process.env.PORT_GATEWAY) ?? 4000;
  const app = await NestFactory.create<NestFastifyApplication>(
    ApiGatewayModule,
    new FastifyAdapter({
      logger: true,
    })
  );
  await app.listen(port);
}
bootstrap();
