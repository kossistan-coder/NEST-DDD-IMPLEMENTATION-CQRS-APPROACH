export interface UserProps {
    id: string;
    name: string;
    email: string;
    password?: string | null | undefined;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    preferences: Record<string, any>;
    isEmailVerified: boolean;
    lastLoginAt: Date;
}

export class User {
    private id: string;
    private name: string;
    private email: string;
    private password?: string | null | undefined;
    private status: string;
    private createdAt: Date;
    private updatedAt: Date;
    private preferences: Record<string, any>;
    private isEmailVerified: boolean;
    private lastLoginAt: Date;

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


    getId() {
        return this.id;
    }


    getName() {
        return this.name;
    }

    getEmail() {
        return this.email;
    }

    getPassword() {
        return this.password;
    }

    getStatus() {
        return this.status;
    }

    getCreatedAt() {
        return this.createdAt;
    }

    getUpdatedAt() {
        return this.updatedAt;
    }

    getPreferences() {
        return this.preferences;
    }

    getIsEmailVerified() {
        return this.isEmailVerified;
    }

    getLastLoginAt() {
        return this.lastLoginAt;
    }
}