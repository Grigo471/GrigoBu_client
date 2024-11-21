import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ArticleDetailsSchema } from '../types/ArticleDetailsSchema';
import {
    Article, articlesApi, fetchArticleById,
    RateArticleResult,
} from '@/entities/Article';
import { subscribeToUser, unsubscribeToUser } from '@/features/SubscribeToUserButton';

const initialState: ArticleDetailsSchema = {
    isLoading: true,
    error: undefined,
    data: undefined,
};

export const articleDetailsSlice = createSlice({
    name: 'articleDetails',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticleById.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchArticleById.fulfilled, (state, action: PayloadAction<Article>) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchArticleById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(
                subscribeToUser.fulfilled,
                (state) => {
                    if (state.data?.user) state.data.user.amISubscribed = true;
                },
            )
            .addCase(
                unsubscribeToUser.fulfilled,
                (state) => {
                    if (state.data?.user) state.data.user.amISubscribed = false;
                },
            )
            .addMatcher(
                articlesApi.endpoints.rateArticle.matchFulfilled,
                (state, action: PayloadAction<RateArticleResult>) => {
                    if (state.data) {
                        state.data.myRate = action.payload.myRate;
                        state.data.rating = action.payload.rating;
                    }
                },
            );
    },
});

export const { actions: articleDetailsActions } = articleDetailsSlice;
export const { reducer: articleDetailsReducers } = articleDetailsSlice;
