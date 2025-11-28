import { User } from "../entities/user.aggregate"

export interface IUserRepositoryInterface {
    findUserByEmail(email: string): Promise<User | null>
    findUserById(id: string): Promise<User | null>
    save(user: User): Promise<User>
    update(user: User): Promise<User>
    delete(user: User): Promise<User>
}