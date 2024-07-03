import { CommentList } from 'entities/Comment';
import { AddCommentForm } from 'features/AddCommentForm';
import { type PropsWithChildren, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import {
    Text, TextAlign, TextSize, TextTheme,
} from 'shared/ui/Text/Text';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect';
import { VStack } from 'shared/ui/Stack';
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

interface ArticleDetailsCommentsProps {
   className?: string;
   id: string;
}

export const ArticleDetailsComments = memo((
    props: PropsWithChildren<ArticleDetailsCommentsProps>,
) => {
    const { className, id } = props;
    const { t } = useTranslation();
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
                size={TextSize.L}
            />
            <AddCommentForm onSendComment={onSendComment} />
            {error
                ? (
                    <Text
                        align={TextAlign.CENTER}
                        theme={TextTheme.ERROR}
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
