import { SortOrder } from '@/shared/types';
import { ArticleSortField } from '../consts/consts';

// interface ArticlesListParams {
//     // pagination
//     page: number;
//     // filters
//     order: SortOrder;
//     sort: ArticleSortField;
//     search: string;
// }

export interface ArticlesListsPagesSchema {
    pages: Record<string, number>;
    sorts: Record<string, ArticleSortField>;
    orders: Record<string, SortOrder>;
    searches: Record<string, string>;
}
