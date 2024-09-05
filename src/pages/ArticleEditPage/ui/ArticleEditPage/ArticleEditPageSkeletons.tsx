import { memo } from 'react';
import { VStack } from '@/shared/ui/Stack';
import { Skeleton } from '@/shared/ui/Skeleton';

export const ArticleEditPageSkeletons = memo(() => (
    <VStack gap="16" max>
        <Skeleton width={200} height={200} border="50%" />
        <Skeleton width={300} height={32} />
        <Skeleton width={600} height={24} />
        <Skeleton width="100%" height={200} />
        <Skeleton width="100%" height={200} />
    </VStack>
));
