import { EntityState } from '@reduxjs/toolkit';
import {
    Article, ArticleSortField, ArticleType, ArticleView,
} from 'entities/Article';
import { SortOrder } from 'shared/types';

export interface ArticlesPageSchema extends EntityState<Article> {
    isLoading?: boolean;
    error?: string;

    // pagination
    page: number;
    limit: number;
    hasMore: boolean;
    // filters
    order: SortOrder;
    view: ArticleView;
    sort: ArticleSortField;
    search: string;
    type: ArticleType;

    _inited: boolean;
}
