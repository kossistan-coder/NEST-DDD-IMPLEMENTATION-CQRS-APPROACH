import { User } from "../entities/user.entity"

export interface IUserRepositoryInterface {
    findUserByEmail(email: string): Promise<User | null>
    findLatestUser(): Promise<User | null>
    searchUsers(
        query: string,
        limit: number,
        skip: number
    ): Promise<{
        users: User[];
        pagination: Record<string, any>;
    }>;
    findUserOrders(userId: string): Promise<any[]>
}