export interface UserProps {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password?: string | null | undefined;
    telephone: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    preferences?: Record<string, any> | null | undefined;
    isEmailVerified: boolean;
    lastLoginAt: Date;
}

export class User {
    private id: string;
    private firstName: string;
    private lastName: string;
    private email: string;
    public password?: string | null | undefined;
    private telephone: string;
    private status: string;
    private createdAt: Date;
    private updatedAt: Date;
    private preferences?: Record<string, any> | null | undefined;
    private isEmailVerified: boolean;
    private lastLoginAt: Date;

    constructor(props: UserProps) {
        this.id = props.id;
        this.firstName = props.firstName;
        this.lastName = props.lastName;
        this.email = props.email;
        this.password = props.password;
        this.telephone = props.telephone;
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


    getFirstName() {
        return this.firstName;
    }

    getLastName() {
        return this.lastName;
    }

    getEmail() {
        return this.email;
    }

    getPassword() {
        return this.password;
    }

    getTelephone() {
        return this.telephone;
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