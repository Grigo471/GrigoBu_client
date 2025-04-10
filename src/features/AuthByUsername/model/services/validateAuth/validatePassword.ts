import { ValidatePasswordError } from '../../consts/validateAuthErrors';

export const validatePassword = (password: string, login: boolean = false) => {
    const passwordErrors: ValidatePasswordError[] = [];

    if (!password) {
        passwordErrors.push(ValidatePasswordError.EMPTY_PASSWORD);
    }

    if (login) return passwordErrors;

    if (password.length > 25 || password.length < 3) {
        passwordErrors.push(ValidatePasswordError.PASSWORD_LENGTH);
    }

    if (/\s/g.test(password)) {
        passwordErrors.push(ValidatePasswordError.INCORRECT_PASSWORD);
    }

    return passwordErrors;
};
