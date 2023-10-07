import { memo, useCallback, type PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { ArticleDetails, ArticleList } from 'entities/Article';
import { useNavigate, useParams } from 'react-router-dom';
import {
    Text, TextAlign, TextSize, TextTheme,
} from 'shared/ui/Text/Text';
import { CommentList } from 'entities/Comment';
import { ReducerList, useDynamicModuleLoad } from 'shared/lib/hooks/useDynamicModuleLoad';
import { useSelector } from 'react-redux';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { AddCommentForm } from 'features/AddCommentForm';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { RoutePaths } from 'shared/config/routeConfig/routeConfig';
import { Page } from 'widgets/Page/Page';
import cls from './ArticleDetailsPage.module.scss';
import {
    getArticleComments,
} from '../model/slice/articleDetailsCommentsSlice';
import {
    getArticleCommentsError,
    getArticleCommentsIsLoading,
} from '../model/selectors/commentsSelectors';
import { fetchCommentsByArticleId }
    from '../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { addCommentForArticle } from '../model/services/addCommentForArticle/addCommentForArticle';
import {
    getArticleRecommendations,
} from '../model/slice/articleDetailsPageRecommendationsSlice';
import {
    getArticleRecommendationsError,
    getArticleRecommendationsIsLoading,
} from '../model/selectors/recommendationsSelectors';
import {
    fetchArticleRecommendations,
} from '../model/services/fetchArticleRecommendations/fetchArticleRecommendations';
import { articleDetailsPageReducer } from '../model/slice';

interface ArticleDetailsPageProps {
   className?: string;
}

const reducers: ReducerList = {
    articleDetailsPage: articleDetailsPageReducer,
};

const ArticleDetailsPage = (props: PropsWithChildren<ArticleDetailsPageProps>) => {
    const { className } = props;
    const { t } = useTranslation('article');
    const { id } = useParams< string >();
    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    useDynamicModuleLoad({ reducers });

    const comments = useSelector(getArticleComments.selectAll);
    const recommendations = useSelector(getArticleRecommendations.selectAll);
    const isLoading = useSelector(getArticleCommentsIsLoading);
    const error = useSelector(getArticleCommentsError);
    const recommendationsIsLoading = useSelector(getArticleRecommendationsIsLoading);
    const recommendationsError = useSelector(getArticleRecommendationsError);

    const onSendComment = useCallback((text: string) => {
        dispatch(addCommentForArticle(text));
    }, [dispatch]);

    const onBackToList = useCallback(() => {
        navigate(RoutePaths.articles);
    }, [navigate]);

    useInitialEffect(() => {
        dispatch(fetchCommentsByArticleId(id));
        dispatch(fetchArticleRecommendations());
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
            <Text
                title={t('Рекомендуем')}
                className={cls.commentTitle}
                size={TextSize.L}
            />
            <ArticleList
                articles={recommendations}
                isLoading={recommendationsIsLoading}
                className={cls.recommendations}
                target="_blank"
            />
            <Text
                title={t('Комментарии')}
                className={cls.commentTitle}
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
        </Page>
    );
};

export default memo(ArticleDetailsPage);
