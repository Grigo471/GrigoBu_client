import { createSelector } from '@reduxjs/toolkit';
import { getUserAuthData } from '@/entities/User';

import MainIconDeprecated from '@/shared/assets/icons/home-old.svg';
import AboutIconDeprecated from '@/shared/assets/icons/about.svg';
import ProfileIconDeprecated from '@/shared/assets/icons/profile-old.svg';
import ArticlesIconDeprecated from '@/shared/assets/icons/articles-old.svg';

import MainIcon from '@/shared/assets/icons/home.svg';
import AboutIcon from '@/shared/assets/icons/Info.svg';
import ProfileIcon from '@/shared/assets/icons/profile.svg';
import ArticlesIcon from '@/shared/assets/icons/articles.svg';

import { SidebarItemType } from '../types/sidebar';
import {
    getRouteAbout, getRouteArticles, getRouteMain, getRouteProfile,
} from '@/shared/const/router';
import { toggleFeatures } from '@/shared/lib/features';

export const getSidebarItems = createSelector(
    getUserAuthData,
    (userData) => {
        const SidebarItemsList: SidebarItemType[] = [
            {
                path: getRouteMain(),
                Icon: toggleFeatures({
                    name: 'isAppRedesigned',
                    on: () => MainIcon,
                    off: () => MainIconDeprecated,
                }),
                text: 'Главная',
            },
            {
                path: getRouteAbout(),
                Icon: toggleFeatures({
                    name: 'isAppRedesigned',
                    on: () => AboutIcon,
                    off: () => AboutIconDeprecated,
                }),
                text: 'О нас',
            },
        ];

        if (userData) {
            SidebarItemsList.push(
                {
                    path: getRouteProfile(userData.id),
                    Icon: toggleFeatures({
                        name: 'isAppRedesigned',
                        on: () => ProfileIcon,
                        off: () => ProfileIconDeprecated,
                    }),
                    text: 'Профиль',
                    authOnly: true,
                },
                {
                    path: getRouteArticles(),
                    Icon: toggleFeatures({
                        name: 'isAppRedesigned',
                        on: () => ArticlesIcon,
                        off: () => ArticlesIconDeprecated,
                    }),
                    text: 'Статьи',
                    authOnly: true,
                },
            );
        }

        return SidebarItemsList;
    },
);
