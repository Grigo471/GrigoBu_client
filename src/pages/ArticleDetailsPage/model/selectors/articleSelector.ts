import { createSelector } from '@reduxjs/toolkit';
import { getUserAuthData } from '@/entities/User';
import { StateSchema } from '@/app/providers/StoreProvider';

export const getArticleDetailsData = (
    state: StateSchema,
) => state.articleDetailsPage?.article.data;

export const getArticleDetailsIsLoading = (
    state: StateSchema,
) => state.articleDetailsPage?.article.isLoading;

export const getArticleDetailsError = (
    state: StateSchema,
) => state.articleDetailsPage?.article.error;

export const getCanEditArticle = createSelector(
    getArticleDetailsData,
    getUserAuthData,
    (article, user) => {
        if (!article || !user) {
            return false;
        }

        return article.user.username === user.username;
    },
);
