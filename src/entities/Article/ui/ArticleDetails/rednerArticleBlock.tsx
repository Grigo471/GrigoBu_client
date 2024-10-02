import { ArticleBlock } from '../../model/types/article';
import { ArticleCodeBlockComponent } from '../ArticleCodeBlockComponent/ArticleCodeBlockComponent';
import {
    ArticleImageBlockComponent,
} from '../ArticleImageBlockComponent/ArticleImageBlockComponent';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
import cls from './ArticleDetails.module.scss';

export const renderArticleBlock = (block: ArticleBlock, index: number) => {
    switch (block.type) {
    case 'code':
        return (
            <ArticleCodeBlockComponent
                className={cls.block}
                block={block}
                key={index}
            />
        );
    case 'text':
        return (
            <ArticleTextBlockComponent
                className={cls.block}
                block={block}
                key={index}
            />
        );
    case 'image':
        return (
            <ArticleImageBlockComponent
                className={cls.block}
                block={block}
                key={index}
            />
        );
    default:
        return null;
    }
};
