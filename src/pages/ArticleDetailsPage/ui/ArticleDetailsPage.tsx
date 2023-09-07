import { memo, type PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { ArticleDetails } from 'entities/Article';
import { useParams } from 'react-router-dom';
import { Text } from 'shared/ui/Text/Text';
import { CommentList } from 'entities/Comment';
import { ReducerList, useDynamicModuleLoad } from 'shared/lib/hooks/useDynamicModuleLoad';
import { useSelector } from 'react-redux';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
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

    const dispatch = useAppDispatch();

    useDynamicModuleLoad({ reducers });

    const comments = useSelector(getArticleComments.selectAll);
    const isLoading = useSelector(getArticleCommentsIsLoading);
    const error = useSelector(getArticleCommentsError);

    useInitialEffect(() => {
        dispatch(fetchCommentsByArticleId(id));
    });

    if (!id) {
        return (
            <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
                {t('Статья не найдена')}
            </div>
        );
    }

    return (
        <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
            <ArticleDetails articleId={id} />
            <Text title={t('Комментарии')} className={cls.commentTitle} />
            <CommentList
                isLoading={isLoading}
                comments={comments}
            />
        </div>
    );
};

export default memo(ArticleDetailsPage);
