import { UserRole } from '../consts/consts';
import { JsonSettings } from './jsonSettings';

export interface User {
    id: number;
    username: string;
    avatar?: string;
    status?: string;
    rating?: number;
    role?: UserRole;
    jsonSettings?: JsonSettings;
}

export interface UserSchema {
    authData?: User;
    _inited: boolean;
}
