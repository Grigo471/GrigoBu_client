import { createSelector } from '@reduxjs/toolkit';
import { getUserAuthData } from '@/entities/User';

import MainIcon from '@/shared/assets/icons/home.svg';
import AboutIcon from '@/shared/assets/icons/about.svg';
import ProfileIcon from '@/shared/assets/icons/profile.svg';
import ArticlesIcon from '@/shared/assets/icons/articles.svg';
import { SidebarItemType } from '../types/sidebar';
import { RoutePaths } from '@/shared/const/router';

export const getSidebarItems = createSelector(
    getUserAuthData,
    (userData) => {
        const SidebarItemsList: SidebarItemType[] = [
            {
                path: RoutePaths.main,
                Icon: MainIcon,
                text: 'Главная',
            },
            {
                path: RoutePaths.about,
                Icon: AboutIcon,
                text: 'О нас',
            },
        ];

        if (userData) {
            SidebarItemsList.push(
                {
                    path: RoutePaths.profile + userData.id,
                    Icon: ProfileIcon,
                    text: 'Профиль',
                    authOnly: true,
                },
                {
                    path: RoutePaths.articles,
                    Icon: ArticlesIcon,
                    text: 'Статьи',
                    authOnly: true,
                },
            );
        }

        return SidebarItemsList;
    },
);
