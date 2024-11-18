import { StateSchema } from '@/app/providers/StoreProvider';

export const getProfileData = (
    state: StateSchema,
) => state.profileCard?.profileData;

export const getProfileIsLoading = (
    state: StateSchema,
) => state.profileCard?.isLoading;

export const getProfileAmISubscribed = (
    state: StateSchema,
) => state.profileCard?.profileData?.amISubscribed;

export const getProfileError = (
    state: StateSchema,
) => state.profileCard?.error;
