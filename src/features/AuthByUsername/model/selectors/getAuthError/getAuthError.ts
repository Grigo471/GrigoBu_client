import { StateSchema } from '@/app/providers/StoreProvider';

export const getAuthError = (state: StateSchema) => state?.authForm?.error;
