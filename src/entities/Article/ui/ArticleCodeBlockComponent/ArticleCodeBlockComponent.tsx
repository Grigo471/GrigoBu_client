import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ArticleCodeBlock } from '../../model/types/article';
import cls from './ArticleCodeBlockComponent.module.scss';
import { Code } from '@/shared/ui/Code';
import { Text } from '@/shared/ui/Text';

interface ArticleCodeBlockComponentProps {
   className?: string;
   block: ArticleCodeBlock;
}

export const ArticleCodeBlockComponent = memo(
    (props: ArticleCodeBlockComponentProps) => {
        const { className, block } = props;

        return (
            <div className={classNames(cls.ArticleCodeBlockComponent, {}, [className])}>
                {block.title && (
                    <Text text={block.title} align="center" bold className={cls.title} />
                )}
                <Code text={block.code} />
            </div>
        );
    },
);
