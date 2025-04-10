import { User } from '@/entities/User';
import { ValidatePasswordError, ValidateUsernameError } from '../consts/validateAuthErrors';
import { AuthApiKnownError, AuthUnknownError } from '../consts/authApiErrors';

export interface LoginProps {
    username: string;
    password: string;
}

export interface AuthResponse {
    user: User;
    accessToken: string;
    refreshToken: string;
}

interface AuthRejectPayload {
    type: 'validation' | 'api'
}

export interface AuthValidationRejectPayload extends AuthRejectPayload {
    type: 'validation';
    nameErrors: ValidateUsernameError[];
    passwordErrors: ValidatePasswordError[];
}

export interface AuthApiRejectPayload extends AuthRejectPayload {
    type: 'api';
    message: AuthApiKnownError | AuthUnknownError;
}
