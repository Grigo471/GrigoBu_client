import { ArticleSortField } from '@/entities/Article';
import { SortOrder } from '@/shared/types';

export interface SubscriptionsPageSchema {
    order: SortOrder;
    sort: ArticleSortField;
    search: string;
}
