import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/Skeleton';
import { HStack, VStack } from '@/shared/ui/Stack';
import cls from './CommentCard.module.scss';
import { Comment } from '../../model/types/comment';
import { getRouteProfile } from '@/shared/const/router';
import { AppLink } from '@/shared/ui/AppLink';
import { Avatar } from '@/shared/ui/Avatar';
import { Text } from '@/shared/ui/Text';
import { Card } from '@/shared/ui/Card';
import { srcWithApi } from '@/shared/lib/url/srcWithApi/srcWithApi';
import { useDevice } from '@/shared/lib/hooks/useDevice';
import { formatDateToLocal } from '@/shared/lib/helpers/date/formatDateToLocal';

interface CommentCardProps {
   className?: string;
   comment?: Comment;
   isLoading?: boolean;
}

export const CommentCard = memo((props: CommentCardProps) => {
    const { className, comment, isLoading } = props;

    const { i18n } = useTranslation();
    const isMobile = useDevice();
    const date = formatDateToLocal(comment?.createdAt, i18n.language, !isMobile);

    const Skeleton = SkeletonRedesigned;

    if (isLoading) {
        return (
            <VStack
                data-testid="CommentCard.loading"
                gap="8"
                max
                className={classNames(cls.CommentCard, {}, [className, cls.loading])}
            >
                <div className={cls.header}>
                    <Skeleton width={30} height={30} border="50%" />
                    <Skeleton height={16} width={100} className={cls.username} />
                </div>
                <Skeleton width="100%" height={50} className={cls.text} />
            </VStack>
        );
    }

    if (!comment) {
        return null;
    }

    const avatar = srcWithApi(comment.user.avatar);

    return (

        <Card padding="24" max>
            <VStack
                data-testid="CommentCard.content"
                gap="8"
                max
                className={classNames(cls.CommentCardRedesigned, {}, [className])}
            >
                <AppLink to={getRouteProfile(comment.user.username)}>
                    <HStack gap="8">
                        <Avatar size={30} src={avatar} />
                        <Text text={comment.user.username} bold />
                        <Text text={date} />
                    </HStack>
                </AppLink>
                <pre className={cls.pre}>
                    {comment.text}
                </pre>
            </VStack>
        </Card>

    );
});
