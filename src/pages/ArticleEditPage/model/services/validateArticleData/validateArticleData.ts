import { Article } from '@/entities/Article';
import { ValidateArticleError } from '../../consts/consts';

export const validateArticleData = (article?: Article) => {
    if (!article) {
        return [ValidateArticleError.NO_DATA];
    }

    const {
        title, blocks,
    } = article;

    const errors: ValidateArticleError[] = [];

    if (!title) {
        errors.push(ValidateArticleError.EMPTY_TITLE);
    }

    if (blocks.length === 0) {
        errors.push(ValidateArticleError.NO_BLOCKS);
    }

    if (blocks.some((block) => {
        switch (block.type) {
        case 'text':
            return block.paragraphs.length === 0;
        case 'image':
            return block.src.length === 0;
        case 'code':
            return block.code.length === 0;
        default: return false;
        }
    })) {
        errors.push(ValidateArticleError.EMPTY_BLOCKS);
    }

    return errors;
};
