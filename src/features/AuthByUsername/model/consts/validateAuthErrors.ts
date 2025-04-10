export enum ValidateUsernameError {
    EMPTY_USERNAME = 'EMPTY USERNAME',
    INCORRECT_USERNAME = 'INCORRECT USERNAME',
    USERNAME_LENGTH = 'USERNAME LENGTH',
}

export enum ValidatePasswordError {
    EMPTY_PASSWORD = 'EMPTY PASSWORD',
    INCORRECT_PASSWORD = 'INCORRECT PASSWORD',
    PASSWORD_LENGTH = 'PASSWORD LENGTH',
}

export interface ValidateAuthErrors {
    nameErrors: ValidateUsernameError[];
    passwordErrors: ValidatePasswordError[];
}

export const validateAuthErrorTranslations: Record<
ValidateUsernameError
| ValidatePasswordError, string> = {
    [ValidateUsernameError.EMPTY_USERNAME]: 'Имя не должно быть пустым',
    [ValidatePasswordError.EMPTY_PASSWORD]: 'Пароль не должен быть пустым',
    [
    ValidateUsernameError.INCORRECT_USERNAME
    ]: 'Имя не должно содержать пробелов и посторонних символов',
    [ValidatePasswordError.INCORRECT_PASSWORD]: 'Пароль не должен содержать пробелов',
    [ValidateUsernameError.USERNAME_LENGTH]: 'Имя должно быть от 5 до 15 символов',
    [ValidatePasswordError.PASSWORD_LENGTH]: 'Пароль должен быть от 3 до 25 символов',
};
