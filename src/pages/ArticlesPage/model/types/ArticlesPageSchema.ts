import { Rate } from '@/entities/Article';

export interface ArticlesPageSchema {
    tags: string[];
    myRateFilter?: Rate;
    // ui
    tagsVisible: boolean;
}
