import { memo, type PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text } from 'shared/ui/Text/Text';
import { ArticleTextBlock } from '../../model/types/article';
import cls from './ArticleTextBlockComponent.module.scss';

interface ArticleTextBlockComponentProps {
   className?: string;
   block: ArticleTextBlock
}

export const ArticleTextBlockComponent = memo(
    (props: PropsWithChildren<ArticleTextBlockComponentProps>) => {
        const { className, block } = props;
        const { t } = useTranslation();

        return (
            <div className={classNames(cls.ArticleTextBlockComponent, {}, [className])}>
                {block.title && (
                    <Text title={block.title} className={cls.title} />
                )}
                {block.paragraphs.map((paragraph) => (
                    <Text key={paragraph} text={paragraph} className={cls.paragraph} />
                ))}
            </div>
        );
    },
);
