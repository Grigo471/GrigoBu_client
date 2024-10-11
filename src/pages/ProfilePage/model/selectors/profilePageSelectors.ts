import { StateSchema } from '@/app/providers/StoreProvider';

export const getProfilePageNum = (state: StateSchema) => state.profilePage?.page || 1;

export const getProfilePageLimit = (
    state: StateSchema,
) => state.profilePage?.limit || 5;

export const getProfilePageOrder = (
    state: StateSchema,
) => state.profilePage?.order ?? 'desc';

export const getProfilePageSort = (
    state: StateSchema,
) => state.profilePage?.sort ?? 'createdAt';

export const getProfilePageSearch = (
    state: StateSchema,
) => state.profilePage?.search ?? '';
