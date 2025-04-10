export const authApiKnownError = {
    USER_EXISTS: '^User [\\wЁёА-я]* already exists$',
    WRONG_PASSWORD: 'Wrong password',
    USER_NOT_FOUND: '^User [\\wЁёА-я]* not found$',
} as const;

export type AuthApiKnownError = TypeFromConst<typeof authApiKnownError>;

export function isAuthKnownApiError(error: string): error is AuthApiKnownError {
    return Object.values<string>(authApiKnownError).some((known) => {
        const regex = new RegExp(known);
        return regex.test(error);
    });
}

export type AuthUnknownError = 'Unforseen error';
