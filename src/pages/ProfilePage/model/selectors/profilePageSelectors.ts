import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';

export const getProfilePage = (state: StateSchema) => state.profilePage?.profilePages;

export const getProfilePageNum = createSelector(
    getProfilePage,
    (state: StateSchema, username: string) => username,
    (profilePage, username) => profilePage?.[username]?.page || 1,
);

export const getProfilePageOrder = createSelector(
    getProfilePage,
    (state: StateSchema, username: string) => username,
    (profilePage, username) => profilePage?.[username]?.order || 'desc',
);

export const getProfilePageSort = createSelector(
    getProfilePage,
    (state: StateSchema, username: string) => username,
    (profilePage, username) => profilePage?.[username]?.sort ?? 'createdAt',
);

export const getProfilePageSearch = createSelector(
    getProfilePage,
    (state: StateSchema, username: string) => username,
    (profilePage, username) => profilePage?.[username]?.search ?? '',
);
