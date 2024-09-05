import { StateSchema } from '@/app/providers/StoreProvider';

export const getAuthUsername = (state: StateSchema) => state?.authForm?.username || '';
