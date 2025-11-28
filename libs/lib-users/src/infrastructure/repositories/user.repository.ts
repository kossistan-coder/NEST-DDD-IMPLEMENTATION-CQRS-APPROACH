import { User } from "@app/lib-users/domain/entities/user.aggregate";
import { IUserRepositoryInterface } from "@app/lib-users/domain/interfaces/user-repository.interface";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserRepository implements IUserRepositoryInterface {
    findUserByEmail(email: string): Promise<User | null> {
        throw new Error("Method not implemented.");
    }
    findUserById(id: string): Promise<User | null> {
        throw new Error("Method not implemented.");
    }
    save(user: User): Promise<User> {
        throw new Error("Method not implemented.");
    }
    update(user: User): Promise<User> {
        throw new Error("Method not implemented.");
    }
    delete(user: User): Promise<User> {
        throw new Error("Method not implemented.");
    }

}