import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';

export const getUserRole = (state: StateSchema) => state.user.authData?.role;

export const isUserAdmin = createSelector(
    getUserRole,
    (role) => (role === 'admin'),
);

export const isUserModerator = createSelector(
    getUserRole,
    (role) => (role === 'moderator'),
);
