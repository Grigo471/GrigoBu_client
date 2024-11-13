import { ArticleSortField } from '@/entities/Article';
import { SortOrder } from '@/shared/types';

export interface SingleProfilePageSchema {
    page: number;
    // filters
    order: SortOrder;
    sort: ArticleSortField;
    search: string;
}

export type ProfilePageByUsername = Record<string, SingleProfilePageSchema>;

export interface ProfilePageSchema {
    profilePages: ProfilePageByUsername;
}
