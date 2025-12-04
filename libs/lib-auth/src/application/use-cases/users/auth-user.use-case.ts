import { ErrorResult, SuccessResult } from "@app/lib-core/utils/domain/result";
import { UserRepository } from "@app/lib-users/infrastructure/repositories/user.repository";
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt'
import { AuthUserDto } from "../../dto/auth-user.dto";

@Injectable()
export class AuthUserUseCase {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService
    ) {

    }

    async execute(authUserDto: AuthUserDto) {

        const { email, password } = authUserDto
        let user = await this.userRepository.findUserByEmail(email)
        if (!user) {
            throw new ErrorResult({
                code: 404,
                clean_message: 'User not found',
                message: 'Utilisateur non trouvé',
                message_en: 'User not found',
            })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.getPassword())

        if (!isPasswordMatch) {
            throw new ErrorResult({
                code: 401,
                clean_message: 'Invalid password',
                message: 'Mot de passe invalide',
                message_en: 'Invalid password',
            })
        }

        delete user.password

        const payload = { ...user }
        const access_token = await this.jwtService.signAsync(payload)


        return new SuccessResult({
            data: {
                user: payload,
                token: access_token
            },
            message: 'Utilisateur trouvé',
            message_en: 'User found',
        })

    }
}