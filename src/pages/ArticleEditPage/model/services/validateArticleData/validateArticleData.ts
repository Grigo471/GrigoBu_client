import { Article, ArticleBlockType } from '@/entities/Article';
import { ValidateArticleError } from '../../consts/consts';

export const validateArticleData = (article?: Article) => {
    if (!article) {
        return [ValidateArticleError.NO_DATA];
    }

    const {
        title, subtitle, img, type, blocks,
    } = article;

    const errors: ValidateArticleError[] = [];

    if (!title || !subtitle || !img) {
        errors.push(ValidateArticleError.EMPTY_MAIN);
    }

    if (!type) {
        errors.push(ValidateArticleError.INCORRECT_ARTICLE_TYPE);
    }

    if (blocks.length === 0) {
        errors.push(ValidateArticleError.NO_BLOCKS);
    }

    if (blocks.some((block) => {
        switch (block.type) {
        case ArticleBlockType.TEXT:
            return block.paragraphs.length === 0;
        case ArticleBlockType.IMAGE:
            return block.src.length === 0;
        case ArticleBlockType.CODE:
            return block.code.length === 0;
        default: return false;
        }
    })) {
        errors.push(ValidateArticleError.EMPTY_BLOCKS);
    }

    return errors;
};
