import { StateSchema } from '@/app/providers/StoreProvider';

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
