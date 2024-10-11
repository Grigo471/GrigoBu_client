import { ArticleSortField } from '@/entities/Article';
import { SortOrder } from '@/shared/types';

export interface ArticlesPageSchema {
    // pagination
    page: number;
    limit: number;
    // filters
    order: SortOrder;
    sort: ArticleSortField;
    search: string;
}
