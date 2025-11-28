import { BaseRepository } from "@app/lib-core/providers/base.mongo.repository";
import { User } from "@app/lib-users/domain/entities/user.entity";
import { IUserRepositoryInterface } from "@app/lib-users/domain/interfaces/user-repository.interface";
import { Injectable } from "@nestjs/common";
import { UserDocument } from "../documents/user.document";
import { MAIN_DATABASE_CONNECTION_NAME } from "@app/lib-core/constants/databases";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class UserRepository extends BaseRepository<UserDocument> implements IUserRepositoryInterface {

    constructor(
        @InjectModel(UserDocument.name, MAIN_DATABASE_CONNECTION_NAME)
        model: Model<UserDocument>,
    ) {
        super(model);
    }

    async findUserByEmail(email: string): Promise<User | null> {
        return await this.model.findOne({ email: email });
    }
    async findLatestUser(): Promise<User | null> {
        const response = await this.model.findOne().sort({ createdAt: -1 });
        const users = response.toDomain();
        return users;
    }



    async searchUsers(query: string, limit: number, skip: number): Promise<{ users: User[], pagination: Record<string, any> }> {
        const [documents, total] = await Promise.all([
            this.model.find({ name: { $regex: query, $options: 'i' } })
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit),
            this.model.countDocuments({ name: { $regex: query, $options: 'i' } })
        ])


        const page = limit > 0 ? Math.floor(skip / limit) + 1 : 1;
        const pages = limit > 0 ? Math.ceil(total / limit) : 1;

        const users = documents.map((document) => document.toDomain());

        return {
            users: users,
            pagination: {
                total,
                limit,
                skip,
                page,
                pages,
                hasNext: page < pages,
                hasPrev: page > 1,
            },
        };
    }


    async findUserOrders(userId: string): Promise<any[]> {
        throw new Error("Method not implemented.");
    }
}