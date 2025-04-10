import {
    authApiKnownError, AuthApiKnownError, AuthUnknownError,
} from '../../consts/authApiErrors';

export function authApiErrorTranslation(error: AuthApiKnownError | AuthUnknownError | undefined) {
    if (!error) return '';
    if (error === 'Unforseen error') return [error];

    const known = Object.values<string>(authApiKnownError).find((known) => {
        const regex = new RegExp(known);
        return regex.test(error);
    });
    switch (known) {
    case authApiKnownError.USER_EXISTS:
    {
        const username = error.split(' ')[1];
        return ['User {{username}} already exists', username];
    }

    case authApiKnownError.USER_NOT_FOUND: {
        const username = error.split(' ')[1];
        return ['User {{username}} not found', username];
    }

    case authApiKnownError.WRONG_PASSWORD: {
        return [error];
    }

    default:
        return '';
    }
}
