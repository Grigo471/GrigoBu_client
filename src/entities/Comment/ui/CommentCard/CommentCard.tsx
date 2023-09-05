import { type PropsWithChildren, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './CommentCard.module.scss';
import { Comment } from '../../model/types/comment';

interface CommentCardProps {
   className?: string;
   comment: Comment;
   isLoading?: boolean;
}

export const CommentCard = memo((props: PropsWithChildren<CommentCardProps>) => {
    const { className, comment, isLoading } = props;
    const { t } = useTranslation();

    return (
        <div className={classNames(cls.CommentCard, {}, [className])}>
            comment
        </div>
    );
});
