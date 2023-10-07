/* eslint-disable max-len */
import { memo, useCallback, type PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { ArticleList } from 'entities/Article';
import { ReducerList, useDynamicModuleLoad } from 'shared/lib/hooks/useDynamicModuleLoad';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import { Page } from 'widgets/Page/Page';
import { Text, TextAlign, TextTheme } from 'shared/ui/Text/Text';
import { useSearchParams } from 'react-router-dom';
import cls from './ArticlesPage.module.scss';
import { articlesPageReducer, getArticles } from '../../model/slice/articlePageSlice';
import {
    getArticlesPageError, getArticlesPageIsLoading, getArticlesPageView,
} from '../../model/selectors/articlesPageSelectors';
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage';
import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage';
import { ArticlesPageFilter } from '../ArticlesPageFilter/ArticlesPageFilter';

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
    const [searchParams] = useSearchParams();

    useDynamicModuleLoad({ reducers, removeAfterUnmount: false });

    const articles = useSelector(getArticles.selectAll);
    const error = useSelector(getArticlesPageError);
    const isLoading = useSelector(getArticlesPageIsLoading);
    const view = useSelector(getArticlesPageView);

    useInitialEffect(() => {
        dispatch(initArticlesPage(searchParams));
    });

    const onLoadNextPart = useCallback(() => {
        dispatch(fetchNextArticlesPage());
    }, [dispatch]);

    if (error) {
        return (
            <Page
                className={classNames(cls.ArticlesPage, {}, [className])}
            >
                <Text
                    align={TextAlign.CENTER}
                    theme={TextTheme.ERROR}
                    title={t('Произошла ошибка при загрузке статьи')}
                />
            </Page>
        );
    }

    return (
        <Page
            onScrollEnd={onLoadNextPart}
            className={classNames(cls.ArticlesPage, {}, [className])}
        >
            <ArticlesPageFilter />
            <ArticleList
                view={view}
                articles={articles}
                isLoading={isLoading}
                className={cls.list}
            />
        </Page>
    );
};

export default memo(ArticlesPage);
