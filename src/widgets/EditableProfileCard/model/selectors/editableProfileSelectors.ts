import { StateSchema } from '@/app/providers/StoreProvider';

export const getEditableProfileData = (
    state: StateSchema,
) => state.editableProfileCard?.profileData;

export const getEditableProfileIsLoading = (
    state: StateSchema,
) => state.editableProfileCard?.isLoading;

export const getEditableProfileError = (
    state: StateSchema,
) => state.editableProfileCard?.error;

export const getEditableProfileIsAvatarLoading = (
    state: StateSchema,
) => state.editableProfileCard?.isAvatarLoading;

export const getEditableProfileAvatarError = (
    state: StateSchema,
) => state.editableProfileCard?.avatarError;

export const getEditableProfileIsInfoLoading = (
    state: StateSchema,
) => state.editableProfileCard?.isInfoLoading;

export const getEditableProfileInfoError = (
    state: StateSchema,
) => state.editableProfileCard?.infoError;
