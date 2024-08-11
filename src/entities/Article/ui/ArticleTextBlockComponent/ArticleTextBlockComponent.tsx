import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { ArticleTextBlock } from '../../model/types/article';
import cls from './ArticleTextBlockComponent.module.scss';
import { ToggleFeatures } from '@/shared/lib/features';
import { Text } from '@/shared/ui/redesigned/Text';

interface ArticleTextBlockComponentProps {
   className?: string;
   block: ArticleTextBlock
}

export const ArticleTextBlockComponent = memo((props: ArticleTextBlockComponentProps) => {
    const { className, block } = props;

    return (
        <div className={classNames(cls.ArticleTextBlockComponent, {}, [className])}>
            {block.title && (
                <ToggleFeatures
                    feature="isAppRedesigned"
                    on={<Text title={block.title} className={cls.title} />}
                    off={<TextDeprecated title={block.title} className={cls.title} />}
                />
            )}
            {block.paragraphs.map((paragraph) => (
                <ToggleFeatures
                    key={paragraph}
                    feature="isAppRedesigned"
                    on={<Text key={paragraph} text={paragraph} className={cls.paragraph} />}
                    off={(
                        <TextDeprecated
                            key={paragraph}
                            text={paragraph}
                            className={cls.paragraph}
                        />
                    )}
                />
            ))}
        </div>
    );
});
