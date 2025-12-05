import { Module } from '@nestjs/common';
import { LibUsersModule } from '@app/lib-users';
import { UserGatewayController } from './controllers/user-gateway.controller';

@Module({
    imports: [LibUsersModule],
    controllers: [UserGatewayController]
})
export class UserGatewayModule {

}