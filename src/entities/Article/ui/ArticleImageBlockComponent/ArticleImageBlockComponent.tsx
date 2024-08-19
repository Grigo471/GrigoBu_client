import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleImageBlockComponent.module.scss';
import { ArticleImageBlock } from '../../model/types/article';
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
                    <Text text={block.title} align="center" />
                )}
            </div>
        );
    },
);
