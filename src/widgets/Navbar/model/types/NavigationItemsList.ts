import {
    getRouteAbout, getRouteArticles,
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
        path: getRouteAbout(),
        text: 'Подписки',
    },
];
