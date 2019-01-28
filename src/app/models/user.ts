import {Profile} from './profile';
export interface Roles {
    user?: boolean;
    venue?: boolean;
}

export class User {
    uid: string;
    email: string;
    roles: Roles;
    username: string;
    name: string;
    description: string;
    venues: string;
    artists: string;
    date: string;
    venueType: string;
    building: string;
    street: string;
    city: string;
    hours: string;
}