import { type PropsWithChildren, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text } from 'shared/ui/Text/Text';
import cls from './CommentList.module.scss';
import { Comment } from '../../model/types/comment';
import { CommentCard } from '../CommentCard/CommentCard';

interface CommentListProps {
   className?: string;
   comments?: Comment[];
   isLoading?: boolean;
}

export const CommentList = memo((props: PropsWithChildren<CommentListProps>) => {
    const { className, comments, isLoading } = props;
    const { t } = useTranslation();

    if (isLoading) {
        return (
            <div className={classNames(cls.CommentList, {}, [className])}>
                <CommentCard isLoading className={cls.comment} />
                <CommentCard isLoading className={cls.comment} />
                <CommentCard isLoading className={cls.comment} />
            </div>
        );
    }

    return (
        <div className={classNames(cls.CommentList, {}, [className])}>
            {comments?.length
                ? comments.map((comment) => (
                    <CommentCard
                        comment={comment}
                        className={cls.comment}
                        isLoading={isLoading}
                    />
                ))
                : <Text text={t('Комментарии отсутствуют')} />}
        </div>
    );
});
