import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '@app/lib-core/constants/auth';
import { LibUsersModule } from '@app/lib-users';
import { AuthUserUseCase } from './application/use-cases/users/auth-user.use-case';
import { AuthAdminUseCase } from './application/use-cases/admin/auth-admin.use-case';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: '1h'
      }

    }),
    LibUsersModule
  ],
  providers: [
    AuthUserUseCase,
    AuthAdminUseCase,
  ],
  exports: [
    AuthUserUseCase,
    AuthAdminUseCase
  ],
})
export class LibAuthModule { }
