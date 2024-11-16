import { rtkApi } from '@/shared/api/rtkApi';
import { Article } from '../model/types/article';
import {
    ArticlesPageParams, ProfilePageParams, RateArticleProps, RateArticleResult,
    SubscriptionsPageParams,
} from './types';
import { ARTICLES_PAGE_CACHE_LIFETIME } from '@/shared/const/articlesApi';

export const articlesApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getArticles: build.query<Article[], ArticlesPageParams>({
            query: (params) => ({
                url: '/articles',
                params,
            }),
            serializeQueryArgs: ({ endpointName, queryArgs }) => {
                const {
                    order, search, sort, tags,
                } = queryArgs;
                return {
                    order, search, sort, endpointName, tags,
                };
            },
            merge: (currentCache, newItems, { arg }) => {
                if (arg.page === 1) {
                    return newItems;
                }
                if (arg.page * arg.limit > currentCache.length) {
                    currentCache.push(...newItems);
                }
            },
            forceRefetch({ currentArg, previousArg }) {
                return !!currentArg?.page
                    && !!previousArg?.page
                    && (currentArg?.page > previousArg?.page);
            },
            keepUnusedDataFor: ARTICLES_PAGE_CACHE_LIFETIME,
            providesTags: ['Articles'],
        }),
        getSubscriptions: build.query<Article[], SubscriptionsPageParams>({
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
                    return newItems;
                } if (arg.page * arg.limit > currentCache.length) {
                    currentCache.push(...newItems);
                }
            },
            forceRefetch({ currentArg, previousArg }) {
                return !!currentArg?.page
                    && !!previousArg?.page
                    && (currentArg?.page > previousArg?.page);
            },
            keepUnusedDataFor: ARTICLES_PAGE_CACHE_LIFETIME,
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
                    return newItems;
                } if (arg.page * arg.limit > currentCache.length) {
                    currentCache.push(...newItems);
                }
            },
            forceRefetch({ currentArg, previousArg }) {
                return !!currentArg?.page
                    && !!previousArg?.page
                    && (currentArg?.page > previousArg?.page);
            },
            keepUnusedDataFor: ARTICLES_PAGE_CACHE_LIFETIME,
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

                    caches.forEach(({ endpointName, originalArgs }) => {
                        if (endpointName === 'getArticles'
                            || endpointName === 'getSubscriptions'
                            || endpointName === 'getUserArticles') {
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
                    });
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
