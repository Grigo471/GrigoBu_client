import { Profile } from 'entities/Profile';

export enum ValidateProfileError {
    INCORRECT_USER_DATA = 'INCORRECT USER DATA',
    INCORRECT_AGE = 'INCORRECT AGE',
    INCORRECT_COUNTRY = 'INCORRECT COUNTRY',
    NO_DATA = 'NO DATA',
    SERVER_ERROR = 'SERVER ERROR',
}

export interface ProfileSchema {
    data?: Profile;
    form?: Profile;
    isLoading?: boolean;
    error?: string;
    readOnly?: boolean;
    validateErrors?: ValidateProfileError[];
}
