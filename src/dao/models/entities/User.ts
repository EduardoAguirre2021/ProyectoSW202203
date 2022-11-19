export interface IUser {
    _id?: unknown;
    name: string;
    email: string;
    username: string;
    birthDate: Date;
    status: string; 
    password?: string;
    oldPasswords?: string[];
    created: Date;
    updated: Date; 
    failedAttempts?: number;
    lastLogin?: Date;
    roles: string[];
}

export interface IUserGoogle {
    displayName: string;
    email: string;
    status: string;
    created: Date;
    lastLogin: Date;
    IdGoogle?: unknown;
  }