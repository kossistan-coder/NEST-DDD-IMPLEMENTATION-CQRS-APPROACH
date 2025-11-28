export interface UserProps {
    id: string;
    name: string;
    email: string;
    password: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    preferences: Record<string, any>;
    isEmailVerified: boolean;
    lastLoginAt: Date;
}

export class User {
    public readonly id: string;
    public readonly name: string;
    public readonly email: string;
    public readonly password: string;
    public readonly status: string;
    public readonly createdAt: Date;
    public readonly updatedAt: Date;
    public readonly preferences: Record<string, any>;
    public readonly isEmailVerified: boolean;
    public readonly lastLoginAt: Date;

    constructor(props: UserProps) {
        this.id = props.id;
        this.name = props.name;
        this.email = props.email;
        this.password = props.password;
        this.status = props.status;
        this.createdAt = props.createdAt;
        this.updatedAt = props.updatedAt;
        this.preferences = props.preferences;
        this.isEmailVerified = props.isEmailVerified;
        this.lastLoginAt = props.lastLoginAt;
    }
}