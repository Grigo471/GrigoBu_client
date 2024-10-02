import { combineReducers } from '@reduxjs/toolkit';
import { ArticleDetailsPageSchema } from '../types';
import { articleDetailsCommentsReducer } from './articleDetailsCommentsSlice';
import { articleDetailsReducers } from './articleDetailsSlice';

export const articleDetailsPageReducer = combineReducers<ArticleDetailsPageSchema>({
    article: articleDetailsReducers,
    comments: articleDetailsCommentsReducer,
});
