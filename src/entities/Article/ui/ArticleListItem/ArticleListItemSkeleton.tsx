import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleListItem.module.scss';
import { Skeleton } from '@/shared/ui/Skeleton';
import { Card } from '@/shared/ui/Card';

interface ArticleListItemSkeletonProps {
    className?: string;
}

export const ArticleListItemSkeleton = memo((props: ArticleListItemSkeletonProps) => {
    const { className } = props;

    return (
        <div className={classNames(cls.ArticleListItem, {}, [className])}>
            <Card>
                <div className={cls.header}>
                    <Skeleton border="50%" width={30} height={30} />
                    <Skeleton width={150} height={16} className={cls.username} />
                    <Skeleton width={150} height={16} className={cls.date} />
                </div>
                <Skeleton width={250} height={24} className={cls.title} />
                <Skeleton height={200} className={cls.img} />
                <div className={cls.footer}>
                    <Skeleton height={36} width={200} />
                </div>
            </Card>
        </div>
    );
});
