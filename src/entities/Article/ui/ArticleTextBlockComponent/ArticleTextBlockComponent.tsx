import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ArticleTextBlock } from '../../model/types/article';
import cls from './ArticleTextBlockComponent.module.scss';
import { Text } from '@/shared/ui/Text';
import { RichTextOutput, RichTextSanitizer } from '@/shared/ui/RichTextEditor';

interface ArticleTextBlockComponentProps {
   className?: string;
   block: ArticleTextBlock
}

export const ArticleTextBlockComponent = memo((props: ArticleTextBlockComponentProps) => {
    const { className, block } = props;

    return (
        <div className={classNames(cls.ArticleTextBlockComponent, {}, [className])}>
            {block.title && (
                <Text title={block.title} className={cls.title} />
            )}
            <RichTextOutput value={RichTextSanitizer(block.paragraphs)} />
        </div>
    );
});
