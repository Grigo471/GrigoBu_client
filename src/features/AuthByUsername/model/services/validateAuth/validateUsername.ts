import { ValidateUsernameError } from '../../consts/validateAuthErrors';

export const validateUsername = (username: string, login: boolean = false) => {
    const nameErrors: ValidateUsernameError[] = [];

    if (!username) {
        nameErrors.push(ValidateUsernameError.EMPTY_USERNAME);
    }

    if (login) return nameErrors;

    if (username.length > 15 || username.length < 5) {
        nameErrors.push(ValidateUsernameError.USERNAME_LENGTH);
    }

    if (!/^[\wЁёА-я]*$/u.test(username)) {
        nameErrors.push(ValidateUsernameError.INCORRECT_USERNAME);
    }

    return nameErrors;
};
