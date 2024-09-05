import { User } from '@/entities/User';

export interface LoginProps {
    username: string;
    password: string;
}

export interface AuthSchema {
    username: string;
    password: string;
    isLoading: boolean;
    error?: string;
}

export interface AuthResponse {
    user: User;
    accessToken: string;
    refreshToken: string;
}
