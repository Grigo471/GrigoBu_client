import { StateSchema } from '@/app/providers/StoreProvider';

export const getAuthApiError = (state: StateSchema) => state?.authForm?.apiError;
