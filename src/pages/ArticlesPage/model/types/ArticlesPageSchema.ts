import { ArticleSortField, Rate } from '@/entities/Article';
import { SortOrder } from '@/shared/types';

export interface ArticlesPageSchema {
    // pagination
    page: number;
    // filters
    order: SortOrder;
    sort: ArticleSortField;
    search: string;
    tags: string[];
    myRateFilter?: Rate;
    // ui
    tagsVisible: boolean;
}
