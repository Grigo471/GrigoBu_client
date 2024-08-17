import { Article } from '@/entities/Article';
import { ValidateArticleError } from '../consts/consts';

export interface ArticleEditPageSchema {
    form: Article;
    isPreview: boolean;
    isLoading?: boolean;
    error?: string;
    validateErrors?: ValidateArticleError[];
}
