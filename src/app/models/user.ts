export interface Roles {
    user?: boolean;
    venue?: boolean;
}

export interface User {
    uid: string;
    email: string;
    roles: Roles;
}