import {
    ValidatePasswordError, ValidateUsernameError,
} from '../consts/validateAuthErrors';
import { AuthApiKnownError, AuthUnknownError } from '../consts/authApiErrors';

export interface AuthSchema {
    username: string;
    password: string;
    isLoading: boolean;
    apiError?: AuthApiKnownError | AuthUnknownError;
    validateUsernameErrors: ValidateUsernameError[];
    validatePasswordErrors: ValidatePasswordError[];
}
