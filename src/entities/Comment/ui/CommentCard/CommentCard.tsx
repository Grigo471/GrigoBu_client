import { type PropsWithChildren, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Text } from 'shared/ui/Text/Text';
import { Skeleton } from 'shared/ui/Sceleton/Skeleton';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import { RoutePaths } from 'shared/config/routeConfig/routeConfig';
import cls from './CommentCard.module.scss';
import { Comment } from '../../model/types/comment';

interface CommentCardProps {
   className?: string;
   comment?: Comment;
   isLoading?: boolean;
}

export const CommentCard = memo((props: PropsWithChildren<CommentCardProps>) => {
    const { className, comment, isLoading } = props;
    const { t } = useTranslation();

    if (isLoading) {
        return (
            <div className={classNames(cls.CommentCard, {}, [className, cls.loading])}>
                <div className={cls.header}>
                    <Skeleton width={30} height={30} border="50%" />
                    <Skeleton height={16} width={100} className={cls.username} />
                </div>
                <Skeleton width="100%" height={50} className={cls.text} />
            </div>
        );
    }

    if (!comment) {
        return null;
    }

    return (
        <div className={classNames(cls.CommentCard, {}, [className])}>
            <AppLink to={`${RoutePaths.profile}${comment.user.id}`} className={cls.header}>
                <Avatar size={30} src={comment.user.avatar} />
                <Text title={comment.user.username} className={cls.username} />
            </AppLink>
            <Text text={comment.text} className={cls.text} />
        </div>
    );
});
