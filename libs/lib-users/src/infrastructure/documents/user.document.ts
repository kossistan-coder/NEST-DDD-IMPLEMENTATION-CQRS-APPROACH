import { User } from "@app/lib-users/domain/entities/user.aggregate";
import { Prop, Schema } from "@nestjs/mongoose";

@Schema({ collection: 'users', timestamps: true, versionKey: false })
export class UserDocument {
    @Prop({ type: String, required: true, unique: true, index: true })
    id: string;

    @Prop({ type: String, required: true, unique: true, lowercase: true })
    email: string;

    @Prop({ type: String, required: true })
    name: string;

    @Prop({ type: String, required: true, default: 'ACTIVE' })
    status: string;

    @Prop({ type: String, required: true })
    passwordHash: string;                    // ← jamais le password en clair


    @Prop({ type: [String], default: ['CUSTOMER'] })
    roles: string[];

    @Prop({ type: Object, default: {} })
    preferences: Record<string, any>;

    @Prop({ type: Boolean, default: false })
    isEmailVerified: boolean;

    @Prop({ type: Date })
    lastLoginAt?: Date;

    @Prop({ type: Date, default: Date.now })
    createdAt: Date;

    @Prop({ type: Date, default: Date.now })
    updatedAt: Date;


    // Mapping propre
    toDomain(): User {
        return new User({
            id: this.id,
            name: this.name,
            email: this.email,
            password: this.passwordHash,
            status: this.status,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            preferences: this.preferences,
            isEmailVerified: this.isEmailVerified,
            lastLoginAt: this.lastLoginAt,
        });
    }

    static fromDomain(user: User): Partial<UserDocument> {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            passwordHash: user.password,
            status: user.status,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            preferences: user.preferences,
            isEmailVerified: user.isEmailVerified,
            lastLoginAt: user.lastLoginAt,
        };
    }
}