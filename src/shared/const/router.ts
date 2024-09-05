export enum AppRoutes {
    ARTICLES = 'articles',
    ABOUT = 'about',
    PROFILE = 'profile',
    USERS = 'users',
    SUBSCRIPTIONS = 'subscriptions',
    ARTICLE_DETAILS = 'article_details',
    ARTICLE_CREATE = 'article_create',
    ARTICLE_EDIT = 'article_edit',
    ADMIN_PANEL = 'admin_panel',
    // last
    NOT_FOUND = 'not_found',
    FORBIDDEN = 'forbidden',
}

export const getRouteArticles = () => '/';
export const getRouteAbout = () => '/about';
export const getRouteUsers = () => '/users';
export const getRouteSubscriptions = () => '/subs';
export const getRouteProfile = (username: string) => `users/${username}`;
export const getRouteArticleDetails = (id: string) => `/article/${id}`;
export const getRouteArticleCreate = () => '/create';
export const getRouteArticleEdit = (id: string) => `/article/${id}/edit`;
export const getRouteAdmin = () => '/admin';
export const getRouteForbidden = () => '/forbidden';

export const AppRouteByPathPattern: Record<string, AppRoutes> = {
    [getRouteArticles()]: AppRoutes.ARTICLES,
    [getRouteAbout()]: AppRoutes.ABOUT,
    [getRouteProfile(':username')]: AppRoutes.PROFILE,
    [getRouteUsers()]: AppRoutes.USERS,
    [getRouteSubscriptions()]: AppRoutes.SUBSCRIPTIONS,
    [getRouteArticleDetails(':id')]: AppRoutes.ARTICLE_DETAILS,
    [getRouteArticleCreate()]: AppRoutes.ARTICLE_CREATE,
    [getRouteArticleEdit(':id')]: AppRoutes.ARTICLE_EDIT,
    [getRouteAdmin()]: AppRoutes.ADMIN_PANEL,
    [getRouteForbidden()]: AppRoutes.FORBIDDEN,
};
