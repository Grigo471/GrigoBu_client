import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { TextAlign, Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import cls from './ArticleImageBlockComponent.module.scss';
import { ArticleImageBlock } from '../../model/types/article';
import { ToggleFeatures } from '@/shared/lib/features';
import { Text } from '@/shared/ui/redesigned/Text';

interface ArticleImageBlockComponentProps {
   className?: string;
   block: ArticleImageBlock;
}

export const ArticleImageBlockComponent = memo(
    (props: ArticleImageBlockComponentProps) => {
        const { className, block } = props;

        return (
            <div className={classNames(cls.ArticleImageBlockComponent, {}, [className])}>
                <img src={block.src} className={cls.img} alt={block.src} />
                {block.title && (
                    <ToggleFeatures
                        feature="isAppRedesigned"
                        on={<Text text={block.title} align="center" />}
                        off={<TextDeprecated text={block.title} align={TextAlign.CENTER} />}
                    />
                )}
            </div>
        );
    },
);
