import { createSelector } from '@reduxjs/toolkit';
import { getUserAuthData } from '@/entities/User';

import {
    getRouteAbout, getRouteArticles, getRouteMain, getRouteProfile,
} from '@/shared/const/router';
import { NavigationItemType } from '../types/NavigationItem';

export const getNavigationItems = createSelector(
    getUserAuthData,
    (userData) => {
        const NavigationItemsList: NavigationItemType[] = [
            {
                path: getRouteMain(),
                text: 'Главная',
            },
            {
                path: getRouteAbout(),
                text: 'Пользователи',
            },
        ];

        if (userData) {
            NavigationItemsList.push(
                {
                    path: getRouteProfile(userData.id),
                    text: 'Профиль',
                    authOnly: true,
                },
                {
                    path: getRouteArticles(),
                    text: 'Статьи',
                    authOnly: true,
                },
            );
        }

        return NavigationItemsList;
    },
);
