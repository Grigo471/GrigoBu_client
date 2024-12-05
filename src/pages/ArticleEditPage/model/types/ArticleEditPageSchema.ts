import { Article } from '@/entities/Article';
import { ValidateArticleError } from '../consts/consts';

export interface ArticleEditPageSchema {
    editForm: Article;
    createForm: Article;
    isEdit: boolean;
    isLoading?: boolean;
    error?: string;
    validateErrors?: ValidateArticleError[];
}
