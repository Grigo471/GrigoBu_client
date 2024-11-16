import { memo } from 'react';
import cls from './ArticlesList.module.scss';
import { Skeleton } from '@/shared/ui/Skeleton';
import { Card } from '@/shared/ui/Card';
import { HStack, VStack } from '@/shared/ui/Stack';

export const ArticleListItemSkeleton = memo(() => (
    <div className={cls.ArticleListSkeleton}>
        <Card padding="24" className={cls.card}>
            <VStack gap="16">
                <HStack gap="8">
                    <Skeleton border="50%" width={24} height={24} />
                    <Skeleton width={150} height={12} />
                    <Skeleton width={150} height={12} />
                </HStack>
                <Skeleton width={250} height={24} />
                <Skeleton height={300} />
                <Skeleton height={36} width={200} />
            </VStack>
        </Card>
    </div>
));
