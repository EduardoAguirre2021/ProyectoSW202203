export interface IUser {
    _id?: unknown;
    name: string;
    email: string;
    username: string;
    status: string; 
    password?: string;
    oldPasswords?: string[];
    created: Date;
    updated: Date; 
    failedAttempts?: number;
    lastLogin?: Date;
    roles: string[];
}