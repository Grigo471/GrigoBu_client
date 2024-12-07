import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';

export const getArticlesListsPages = (state: StateSchema) => state.articlesListsPages.pages;

export const getArticlesListPageByPathname = createSelector(
    getArticlesListsPages,
    (state: StateSchema, pathname: string) => pathname,
    (pages, pathname) => pages[pathname] || 1,
);
