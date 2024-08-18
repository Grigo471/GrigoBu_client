import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Code as CodeDeprecated } from '@/shared/ui/deprecated/Code';
import { ArticleCodeBlock } from '../../model/types/article';
import cls from './ArticleCodeBlockComponent.module.scss';
import { ToggleFeatures } from '@/shared/lib/features';
import { Code } from '@/shared/ui/redesigned/Code';
import { Text } from '@/shared/ui/redesigned/Text';
import { TextAlign, Text as TextDeprecated } from '@/shared/ui/deprecated/Text';

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
                    <ToggleFeatures
                        feature="isAppRedesigned"
                        on={<Text text={block.title} align="center" bold />}
                        off={<TextDeprecated text={block.title} align={TextAlign.CENTER} />}
                    />
                )}
                <ToggleFeatures
                    feature="isAppRedesigned"
                    on={<Code text={block.code} />}
                    off={<CodeDeprecated text={block.code} />}
                />
            </div>
        );
    },
);
