import { SortOrder } from '@/shared/types';
import { ArticleSortField } from '../model/consts/consts';
import { Rate } from '../model/types/article';

export interface ArticlesPageParams {
    limit: number;
    page: number;
    sort: ArticleSortField;
    order: SortOrder;
    search: string;
}

export interface ProfilePageParams extends ArticlesPageParams {
    username?: string;
}

export interface RateArticleResult {
    myRate: Rate;
    articleId: string;
    rating: number;
}

export interface RateArticleProps {
    rate: 'like' | 'dislike';
    articleId: string;
}
