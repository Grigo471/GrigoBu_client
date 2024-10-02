import {
    getRouteAbout, getRouteArticles,
    getRouteSubscriptions,
    getRouteUsers,
} from '@/shared/const/router';

export interface NavigationItemType {
    path: string;
    text: string;
}

export const NavigationItemsList: NavigationItemType[] = [
    {
        path: getRouteArticles(),
        text: 'Статьи',
    },
    {
        path: getRouteUsers(),
        text: 'Пользователи',
    },
    {
        path: getRouteSubscriptions(),
        text: 'Подписки',
    },
    {
        path: getRouteAbout(),
        text: 'О нас',
    },
];
