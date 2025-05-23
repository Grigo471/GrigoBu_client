import {
    type PropsWithChildren, Suspense, memo, useCallback,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { CommentList } from '@/entities/Comment';
import { AddCommentForm } from '@/features/AddCommentForm';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect';
import { VStack } from '@/shared/ui/Stack';
import {
    fetchCommentsByArticleId,
} from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import {
    addCommentForArticle,
} from '../../model/services/addCommentForArticle/addCommentForArticle';
import {
    getArticleCommentsError, getArticleCommentsIsLoading,
} from '../../model/selectors/commentsSelectors';
import { getArticleComments } from '../../model/slice/articleDetailsCommentsSlice';
import { Text } from '@/shared/ui/Text';

interface ArticleDetailsCommentsProps {
   className?: string;
   id: string;
}

export const ArticleDetailsComments = memo((
    props: PropsWithChildren<ArticleDetailsCommentsProps>,
) => {
    const { className, id } = props;
    const { t } = useTranslation('comments');
    const dispatch = useAppDispatch();

    const comments = useSelector(getArticleComments.selectAll);
    const isLoading = useSelector(getArticleCommentsIsLoading);
    const error = useSelector(getArticleCommentsError);

    const onSendComment = useCallback((text: string) => {
        dispatch(addCommentForArticle(text));
    }, [dispatch]);

    useInitialEffect(() => {
        dispatch(fetchCommentsByArticleId(id));
    });

    return (
        <VStack gap="8" max className={classNames('', {}, [className])}>

            <Text
                title={t('Комментарии')}
                size="l"
            />

            <Suspense fallback={<div>...</div>}>
                <AddCommentForm onSendComment={onSendComment} />
            </Suspense>

            {error
                ? (

                    <Text
                        align="center"
                        variant="error"
                        title={t('Произошла ошибка при загрузке комментариев')}
                    />

                )
                : (
                    <CommentList
                        isLoading={isLoading}
                        comments={comments}
                    />
                )}
        </VStack>
    );
});
