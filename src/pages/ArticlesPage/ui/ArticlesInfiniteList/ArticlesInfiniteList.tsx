import { type PropsWithChildren, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { Text, TextAlign, TextTheme } from '@/shared/ui/Text';
import { ArticleList } from '@/entities/Article';
import { ReducerList, useDynamicModuleLoad } from '@/shared/lib/hooks/useDynamicModuleLoad';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { articlesPageReducer, getArticles } from '../../model/slice/articlePageSlice';
import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage';
import {
    getArticlesPageError, getArticlesPageIsLoading, getArticlesPageView,
} from '../../model/selectors/articlesPageSelectors';

const reducers: ReducerList = {
    articlesPage: articlesPageReducer,
};

interface ArticlesInfiniteListProps {
   className?: string;
}

export const ArticlesInfiniteList = memo((props: PropsWithChildren<ArticlesInfiniteListProps>) => {
    const { className } = props;
    const { t } = useTranslation();
    const articles = useSelector(getArticles.selectAll);
    const error = useSelector(getArticlesPageError);
    const isLoading = useSelector(getArticlesPageIsLoading);
    const view = useSelector(getArticlesPageView);

    const dispatch = useAppDispatch();

    useDynamicModuleLoad({ reducers, removeAfterUnmount: false });

    const [searchParams] = useSearchParams();

    useInitialEffect(() => {
        dispatch(initArticlesPage(searchParams));
    });

    if (error) {
        return (
            <Text
                align={TextAlign.CENTER}
                theme={TextTheme.ERROR}
                title={t('Произошла ошибка при загрузке статьи')}
            />
        );
    }

    return (
        <ArticleList
            view={view}
            articles={articles}
            isLoading={isLoading}
            className={className}
        />
    );
});
