import { User } from "@app/lib-users/domain/entities/user.entity";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ collection: 'users', timestamps: true, versionKey: false })
export class UserDocument extends Document {
    @Prop({ type: String, required: true, unique: true, index: true })
    id: string;

    @Prop({ type: String, required: true, unique: true, lowercase: true })
    email: string;

    @Prop({ type: String, required: true, unique: true })
    telephone: string;

    @Prop({ type: String, required: true })
    firstName: string;

    @Prop({ type: String, required: true })
    lastName: string;

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
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            telephone: this.telephone,
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
            id: user.getId(),
            firstName: user.getFirstName(),
            lastName: user.getLastName(),
            email: user.getEmail(),
            telephone: user.getTelephone(),
            passwordHash: user.getPassword(),
            status: user.getStatus(),
            createdAt: user.getCreatedAt(),
            updatedAt: user.getUpdatedAt(),
            preferences: user.getPreferences(),
            isEmailVerified: user.getIsEmailVerified(),
            lastLoginAt: user.getLastLoginAt(),
        };
    }
}

export const UserSchema = SchemaFactory.createForClass(UserDocument);