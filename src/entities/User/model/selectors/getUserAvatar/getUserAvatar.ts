import { StateSchema } from '@/app/providers/StoreProvider';
import { srcWithApi } from '@/shared/lib/url/srcWithApi/srcWithApi';

export const getUserAvatar = (state: StateSchema) => srcWithApi(state.user.authData?.avatar);
