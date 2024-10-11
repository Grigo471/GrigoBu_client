import { StateSchema } from '@/app/providers/StoreProvider';

export const getUsersPageIsLoading = (
    state: StateSchema,
) => state.usersPage?.isLoading;

export const getUsersPageError = (
    state: StateSchema,
) => state.usersPage?.error;
