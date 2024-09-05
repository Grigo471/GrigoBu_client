import { ArticleBlock } from '../../model/types/article';
import { ArticleCodeBlockComponent } from '../ArticleCodeBlockComponent/ArticleCodeBlockComponent';
import {
    ArticleImageBlockComponent,
} from '../ArticleImageBlockComponent/ArticleImageBlockComponent';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
import cls from './ArticleDetails.module.scss';

export const renderArticleBlock = (block: ArticleBlock) => {
    switch (block.type) {
    case 'code':
        return (
            <ArticleCodeBlockComponent
                className={cls.block}
                block={block}
                key={block.id}
            />
        );
    case 'text':
        return (
            <ArticleTextBlockComponent
                className={cls.block}
                block={block}
                key={block.id}
            />
        );
    case 'image':
        return (
            <ArticleImageBlockComponent
                className={cls.block}
                block={block}
                key={block.id}
            />
        );
    default:
        return null;
    }
};
