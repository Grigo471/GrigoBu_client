import { StateSchema } from '@/app/providers/StoreProvider';

export const getSubscriptionsPageNum = (state: StateSchema) => state.subscriptionsPage?.page || 1;

export const getSubscriptionsPageLimit = (
    state: StateSchema,
) => state.subscriptionsPage?.limit || 5;

export const getSubscriptionsPageOrder = (
    state: StateSchema,
) => state.subscriptionsPage?.order ?? 'desc';

export const getSubscriptionsPageSort = (
    state: StateSchema,
) => state.subscriptionsPage?.sort ?? 'createdAt';

export const getSubscriptionsPageSearch = (
    state: StateSchema,
) => state.subscriptionsPage?.search ?? '';

export const getSubscriptionsPageUncollapsed = (
    state: StateSchema,
) => state.subscriptionsPage?.uncollapsedCards ?? [];
