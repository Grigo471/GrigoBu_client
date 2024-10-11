/* eslint-disable no-restricted-syntax */
import { rtkApi } from '@/shared/api/rtkApi';
import { Article, Rate } from '../model/types/article';
import { ArticleSortField } from '../model/consts/consts';
import { SortOrder } from '@/shared/types';

interface ArticlesPageParams {
    limit: number;
    page: number;
    sort: ArticleSortField;
    order: SortOrder;
    search: string;
}

interface ProfilePageParams extends ArticlesPageParams {
    username?: string;
}

export interface RateArticleResult {
    myRate: Rate;
    articleId: string;
    rating: number;
}

interface RateArticleProps {
    rate: 'like' | 'dislike';
    articleId: string;
}

export const articlesApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getArticles: build.query<Article[], ArticlesPageParams>({
            query: (params) => ({
                url: '/articles',
                params,
            }),
            serializeQueryArgs: ({ endpointName, queryArgs }) => {
                const { order, search, sort } = queryArgs;
                return {
                    order, search, sort, endpointName,
                };
            },
            merge: (currentCache, newItems, { arg }) => {
                if (arg.page === 1) {
                    currentCache = newItems;
                } else if (arg.page * arg.limit > currentCache.length) {
                    currentCache.push(...newItems);
                }
            },
            forceRefetch({ currentArg, previousArg }) {
                return !!currentArg?.page
                    && !!previousArg?.page
                    && (currentArg?.page > previousArg?.page);
            },
            providesTags: ['Articles'],
        }),
        getSubscriptions: build.query<Article[], ArticlesPageParams>({
            query: (params) => ({
                url: 'articles/subscriptions',
                params,
            }),
            serializeQueryArgs: ({ endpointName, queryArgs }) => {
                const { order, search, sort } = queryArgs;
                return {
                    order, search, sort, endpointName,
                };
            },
            merge: (currentCache, newItems, { arg }) => {
                if (arg.page === 1) {
                    currentCache = newItems;
                } else if (arg.page * arg.limit > currentCache.length) {
                    currentCache.push(...newItems);
                }
            },
            forceRefetch({ currentArg, previousArg }) {
                return !!currentArg?.page
                    && !!previousArg?.page
                    && (currentArg?.page > previousArg?.page);
            },
            providesTags: ['Articles'],
        }),
        getUserArticles: build.query<Article[], ProfilePageParams>({
            query: ({
                limit, order, page, search, sort, username = '',
            }) => ({
                url: `/articles/user/${username}`,
                params: {
                    limit, order, page, search, sort,
                },
            }),
            serializeQueryArgs: ({ queryArgs }) => {
                const {
                    order, search, sort, username,
                } = queryArgs;
                return {
                    order, search, sort, username,
                };
            },
            merge: (currentCache, newItems, { arg }) => {
                if (arg.page === 1) {
                    currentCache = newItems;
                } else if (arg.page * arg.limit > currentCache.length) {
                    currentCache.push(...newItems);
                }
            },
            forceRefetch({ currentArg, previousArg }) {
                return !!currentArg?.page
                    && !!previousArg?.page
                    && (currentArg?.page > previousArg?.page);
            },
            providesTags: ['Articles'],
        }),
        rateArticle: build.mutation<RateArticleResult, RateArticleProps>({
            query: ({ articleId, rate }) => ({
                url: `/articles/${articleId}/rate`,
                method: 'POST',
                params: { rate },
            }),
            async onQueryStarted(articleId, { dispatch, queryFulfilled, getState }) {
                try {
                    const { articleId, myRate, rating } = (await queryFulfilled).data;
                    const caches = articlesApi.util
                        .selectInvalidatedBy(getState(), ['Articles']);
                    for (const { endpointName, originalArgs } of caches) {
                        if (endpointName === 'getArticles' || endpointName === 'getSubscriptions') {
                            dispatch(
                                articlesApi.util
                                    .updateQueryData(endpointName, originalArgs, (draft) => {
                                        const article = draft.find(
                                            (article) => article.id === articleId,
                                        );
                                        if (article) {
                                            article.myRate = myRate;
                                            article.rating = rating;
                                        }
                                    }),
                            );
                        }
                    }
                } catch (error) {
                    console.log(error);
                }
            },
        }),
    }),
});

export const useGetArticles = articlesApi.useGetArticlesQuery;
export const useGetSubscriptions = articlesApi.useGetSubscriptionsQuery;
export const useGetUserArticles = articlesApi.useGetUserArticlesQuery;
export const useRateArticle = articlesApi.useRateArticleMutation;
