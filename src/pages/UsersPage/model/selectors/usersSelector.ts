import { StateSchema } from '@/app/providers/StoreProvider';

export const getUsersPageIsLoading = (
    state: StateSchema,
) => state.usersPage?.isLoading;

export const getUsersPageError = (
    state: StateSchema,
) => state.usersPage?.error;

export const getUsersPageOrder = (
    state: StateSchema,
) => state.usersPage?.order ?? 'desc';

export const getUsersPageSort = (
    state: StateSchema,
) => state.usersPage?.sort ?? 'rating';

export const getUsersPageSearch = (
    state: StateSchema,
) => state.usersPage?.search ?? '';

export const getUsersPageIsSubs = (
    state: StateSchema,
) => state.usersPage?.isSubs ?? false;
