import { memo, useCallback, type PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { ArticleDetails } from 'entities/Article';
import { useNavigate, useParams } from 'react-router-dom';
import { Text, TextAlign, TextTheme } from 'shared/ui/Text/Text';
import { CommentList } from 'entities/Comment';
import { ReducerList, useDynamicModuleLoad } from 'shared/lib/hooks/useDynamicModuleLoad';
import { useSelector } from 'react-redux';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { AddCommentForm } from 'features/AddCommentForm';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { RoutePaths } from 'shared/config/routeConfig/routeConfig';
import { Page } from 'shared/ui/Page/Page';
import cls from './ArticleDetailsPage.module.scss';
import {
    articleDetailsCommentsReducer,
    getArticleComments,
} from '../model/slice/articleDetailsCommentsSlice';
import {
    getArticleCommentsError,
    getArticleCommentsIsLoading,
} from '../model/selectors/commentsSelectors';
import { fetchCommentsByArticleId }
    from '../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { addCommentForArticle } from '../model/services/addCommentForArticle/addCommentForArticle';

interface ArticleDetailsPageProps {
   className?: string;
}

const reducers: ReducerList = {
    articleDetailsComments: articleDetailsCommentsReducer,
};

const ArticleDetailsPage = (props: PropsWithChildren<ArticleDetailsPageProps>) => {
    const { className } = props;
    const { t } = useTranslation('article');
    const { id } = useParams< string >();
    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    useDynamicModuleLoad({ reducers });

    const comments = useSelector(getArticleComments.selectAll);
    const isLoading = useSelector(getArticleCommentsIsLoading);
    const error = useSelector(getArticleCommentsError);

    const onSendComment = useCallback((text: string) => {
        dispatch(addCommentForArticle(text));
    }, [dispatch]);

    const onBackToList = useCallback(() => {
        navigate(RoutePaths.articles);
    }, [navigate]);

    useInitialEffect(() => {
        dispatch(fetchCommentsByArticleId(id));
    });

    if (!id) {
        return (
            <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
                {t('Статья не найдена')}
            </Page>
        );
    }

    return (
        <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
            <Button theme={ThemeButton.OUTLINE} onClick={onBackToList}>
                {t('Назад к списку')}
            </Button>
            <ArticleDetails articleId={id} />
            <Text title={t('Комментарии')} className={cls.commentTitle} />
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
            <CommentList
                isLoading={isLoading}
                comments={comments}
            />
        </Page>
    );
};

export default memo(ArticleDetailsPage);
