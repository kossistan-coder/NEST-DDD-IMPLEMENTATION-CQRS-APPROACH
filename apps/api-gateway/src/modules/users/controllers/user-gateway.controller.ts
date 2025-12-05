import { Body, Controller, Inject, Post } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { CreateUserDto } from "@app/lib-users/application/dto/create-user.dto";


@Controller('api-gateway')
export class UserGatewayController {
    constructor(
        @Inject('USERS_SERVICE') private readonly userClient: ClientProxy,
    ) { }

    @Post('create-user')
    createUser(@Body() user: CreateUserDto) {
        return this.userClient.send('user.created', user);
    }
}