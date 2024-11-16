import { SortOrder } from '@/shared/types';
import { ArticleSortField } from '../model/consts/consts';
import { Rate } from '../model/types/article';

export interface SubscriptionsPageParams {
    limit: number;
    page: number;
    sort: ArticleSortField;
    order: SortOrder;
    search: string;
}

export interface ArticlesPageParams extends SubscriptionsPageParams {
    tags?: string;
}

export interface ProfilePageParams extends SubscriptionsPageParams {
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
