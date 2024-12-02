import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleImageBlockComponent.module.scss';
import { ArticleImageBlock } from '../../model/types/article';
import { Text } from '@/shared/ui/Text';
import { srcWithApiOrBlob } from '@/shared/lib/url/srcWithApi/srcWithApi';
import { AppImage } from '@/shared/ui/AppImage';
import { Skeleton } from '@/shared/ui/Skeleton';

interface ArticleImageBlockComponentProps {
   className?: string;
   block: ArticleImageBlock;
}

export const ArticleImageBlockComponent = memo(
    (props: ArticleImageBlockComponentProps) => {
        const { className, block } = props;

        return (
            <div className={classNames(cls.ArticleImageBlockComponent, {}, [className])}>
                <AppImage
                    src={srcWithApiOrBlob(block.src)}
                    className={cls.img}
                    fallback={<Skeleton width={500} height={520} />}
                    alt={block.src}
                />
                {block.title && (
                    <Text text={block.title} align="center" />
                )}
            </div>
        );
    },
);
