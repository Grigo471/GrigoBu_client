import { Article } from '@/entities/Article';

export interface ArticleDetailsSchema {
    data?: Article;
    isLoading?: boolean;
    error?: string;
}
