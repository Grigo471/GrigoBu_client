import { memo } from 'react';
import cls from './ArticlesList.module.scss';
import { Skeleton } from '@/shared/ui/Skeleton';
import { Card } from '@/shared/ui/Card';

export const ArticleListItemSkeleton = memo(() => (
    <div className={cls.ArticleListSkeleton}>
        <Card className={cls.card}>
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
));
