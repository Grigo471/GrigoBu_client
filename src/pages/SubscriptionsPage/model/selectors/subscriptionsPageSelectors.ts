import { StateSchema } from '@/app/providers/StoreProvider';

export const getSubscriptionsPageOrder = (
    state: StateSchema,
) => state.subscriptionsPage?.order ?? 'desc';

export const getSubscriptionsPageSort = (
    state: StateSchema,
) => state.subscriptionsPage?.sort ?? 'createdAt';

export const getSubscriptionsPageSearch = (
    state: StateSchema,
) => state.subscriptionsPage?.search ?? '';
