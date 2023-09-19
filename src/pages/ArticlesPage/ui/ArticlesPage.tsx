/* eslint-disable max-len */
import { memo, useCallback, type PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { ArticleList, ArticleView, ArticleViewSelector } from 'entities/Article';
import { ReducerList, useDynamicModuleLoad } from 'shared/lib/hooks/useDynamicModuleLoad';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import cls from './ArticlesPage.module.scss';
import { articlesPageActions, articlesPageReducer, getArticles } from '../model/slice/articlePageSlice';
import { fetchArticlesList } from '../model/services/fetchArticlesList/fetchArticlesList';
import { getArticlesPageError, getArticlesPageIsLoading, getArticlesPageView } from '../model/selectors/articlesPageSelectors';

interface ArticlesPageProps {
   className?: string;
}

const reducers: ReducerList = {
    articlesPage: articlesPageReducer,
};

const ArticlesPage = (props: PropsWithChildren<ArticlesPageProps>) => {
    const { className } = props;
    const { t } = useTranslation('article');
    const dispatch = useAppDispatch();

    useDynamicModuleLoad({ reducers });

    useInitialEffect(() => {
        dispatch(fetchArticlesList());
        dispatch(articlesPageActions.initState());
    });

    const articles = useSelector(getArticles.selectAll);
    const view = useSelector(getArticlesPageView);
    const error = useSelector(getArticlesPageError);
    const isLoading = useSelector(getArticlesPageIsLoading);

    const onChangeView = useCallback((view: ArticleView) => {
        dispatch(articlesPageActions.setView(view));
    }, [dispatch]);

    return (
        <div className={classNames(cls.ArticlesPage, {}, [className])}>
            <ArticleViewSelector view={view} onViewClick={onChangeView} />
            <ArticleList
                view={view}
                articles={articles}
                isLoading={isLoading}
            />
        </div>
    );
};

export default memo(ArticlesPage);
