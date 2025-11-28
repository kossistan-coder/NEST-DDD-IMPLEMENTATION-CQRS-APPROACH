import { Injectable } from "@nestjs/common";
import { IUserRepositoryInterface } from "../interfaces/user-repository.interface";
import { User } from "../entities/user.aggregate";

@Injectable()
export class UserDomainService {
    constructor(
        private readonly userRepositoryInterface: IUserRepositoryInterface
    ) { }


    async findUserByEmail(email: string): Promise<User | null> {
        return await this.userRepositoryInterface.findUserByEmail(email)
    }

    async findUserById(id: string): Promise<User | null> {
        return await this.userRepositoryInterface.findUserById(id)
    }

    async save(user: User): Promise<User> {
        return await this.userRepositoryInterface.save(user)
    }

    async update(user: User): Promise<User> {
        return await this.userRepositoryInterface.update(user)
    }

    async delete(user: User): Promise<User> {
        return await this.userRepositoryInterface.delete(user)
    }
}