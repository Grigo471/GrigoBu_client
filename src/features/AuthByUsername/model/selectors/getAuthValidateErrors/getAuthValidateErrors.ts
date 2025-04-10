import { StateSchema } from '@/app/providers/StoreProvider';

export const getValidateUsernameErrors = (
    state: StateSchema,
) => state?.authForm?.validateUsernameErrors || [];

export const getValidatePasswordErrors = (
    state: StateSchema,
) => state?.authForm?.validatePasswordErrors || [];
