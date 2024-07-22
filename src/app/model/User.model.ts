export interface UserDetails {
    name?: string;
    email?: string;
    password: string;
    userName: string;
}

export interface UserMetadata {
    exist: boolean;
    valid: boolean;
}