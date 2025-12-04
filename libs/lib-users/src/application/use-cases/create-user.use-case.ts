import { Injectable, Logger } from "@nestjs/common";
import { LibMailService } from "@app/lib-mail";
import { UserRepository } from "@app/lib-users/infrastructure/repositories/user.repository";
import { CreateUserDto } from "../dto/create-user.dto";
import { ErrorResult, SuccessResult } from "@app/lib-core/utils/domain/result";
import * as bcrypt from 'bcrypt'
import { SaveJournalUseCase } from "@app/lib-journal/application/use-cases/save-journal.use-case";
import { UserAppConfig } from "@app/lib-core/config/user.env";

@Injectable()
export class CreateUserUseCase {


    private readonly logger = new Logger(CreateUserUseCase.name);
    constructor(
        private readonly userRepository: UserRepository,
        private readonly saveJournalUseCase: SaveJournalUseCase<UserAppConfig>
    ) {

    }

    async execute(createUserDto: CreateUserDto) {
        const filter = [{
            $or: { email: createUserDto.email, telephone: createUserDto.telephone }
        }]
        const existing = await this.userRepository.getOne(filter)
        if (existing) {
            this.logger.error('User already exists')
            throw new ErrorResult({
                code: 409,
                clean_message: 'User already exists',
                message: 'Utilisateur existe deja',
                message_en: 'User already exists',
            })
        }

        const passwordhash = await bcrypt.hash(createUserDto.password, 10)
        const user = await this.userRepository.create({
            ...createUserDto,
            passwordHash: passwordhash
        })

        this.saveJournalUseCase.execute({
            moduleName: 'User',
            className: 'CreateUserUseCase',
            level: 'info',
            message: 'User created successfully',
            data: user
        })

        return new SuccessResult({
            data: user,
            message: 'User created successfully',
            message_en: 'User created successfully',
        })
    }
}