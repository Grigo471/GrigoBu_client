import { type PropsWithChildren, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { VStack } from '@/shared/ui/Stack';
import { Comment } from '../../model/types/comment';
import { CommentCard } from '../CommentCard/CommentCard';
import { ToggleFeatures } from '@/shared/lib/features';
import { Text } from '@/shared/ui/redesigned/Text';

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
            <VStack gap="16" max className={classNames('', {}, [className])}>
                <CommentCard isLoading />
                <CommentCard isLoading />
                <CommentCard isLoading />
            </VStack>
        );
    }

    return (
        <VStack gap="16" max className={classNames('', {}, [className])}>
            {comments?.length
                ? comments.map((comment) => (
                    <CommentCard
                        comment={comment}
                        isLoading={isLoading}
                        key={comment.id}
                    />
                ))
                : (
                    <ToggleFeatures
                        feature="isAppRedesigned"
                        on={<Text text={t('Комментарии отсутствуют')} />}
                        off={<TextDeprecated text={t('Комментарии отсутствуют')} />}
                    />
                )}
        </VStack>
    );
});
