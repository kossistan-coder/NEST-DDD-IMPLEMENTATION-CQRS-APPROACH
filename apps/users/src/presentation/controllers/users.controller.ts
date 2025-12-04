import { AuthUserUseCase } from '@app/lib-auth/application/use-cases/users/auth-user.use-case';
import { ControllerFlashMessage } from '@app/lib-core/utils/controller/flashmessage';
import { CreateUserDto } from '@app/lib-users/application/dto/create-user.dto';
import { CreateUserUseCase } from '@app/lib-users/application/use-cases/create-user.use-case';
import { UserRepository } from '@app/lib-users/infrastructure/repositories/user.repository';
import { Body, Controller, Get, Post, Req, Res, ValidationPipe } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { Request, Response } from 'express';

@Controller()
export class UsersController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly userRepository: UserRepository,
    private readonly authUserUseCase: AuthUserUseCase
  ) { }

  @Get()
  getHello() {
    return 'Hello World!';
  }


  @EventPattern('user.created')
  async createUser(
    @Req() req: Request,
    @Res() res: Response,
    @Body(new ValidationPipe()) createUserDto: CreateUserDto
  ) {
    const lang = req.headers.lang.toString() as 'fr' | 'en';
    try {

      //Create User
      const response = await this.createUserUseCase.execute(createUserDto);


      //Authenticate User after creation

      const authResponse = await this.authUserUseCase.execute({
        email: response.data.email,
        password: createUserDto.password,
      })

      return res.status(200).json({
        data: authResponse.data,
        message: authResponse.message,
        message_en: authResponse.message_en,
      })

    } catch (error) {
      ControllerFlashMessage.setFlash(error, lang, (msg) => {
        return res.status(500).json({
          message: msg,
          data: null
        })
      })
    }
  }


}
