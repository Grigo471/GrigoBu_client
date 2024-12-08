import {
    memo, useEffect,
} from 'react';

import { articlesPageReducer } from '../../model/slice/ArticlesPageSlice';
import { ReducerList, useDynamicModuleLoad } from '@/shared/lib/hooks/useDynamicModuleLoad';
import { ArticlesPageFilters } from '../ArticlesPageFilters/ArticlesPageFilters';
import { ArticlesPageList } from '../ArticlesPageList/ArticlesPageList';
import { ARTICLES_PAGE_CACHE_LIFETIME } from '@/shared/const/articlesApi';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import { scrollByPath } from '@/widgets/ArticlesList';
import { useArticlesListPageActions } from '@/entities/Article';
import { getRouteArticles } from '@/shared/const/router';

const reducers: ReducerList = {
    articlesPage: articlesPageReducer,
};

let articlesPageTimer: NodeJS.Timeout;

const ArticlesPage = () => {
    const pathname = getRouteArticles();
    const { resetPage } = useArticlesListPageActions();

    useEffect(() => {
        if (articlesPageTimer) clearTimeout(articlesPageTimer);

        return () => {
            articlesPageTimer = setTimeout(() => {
                resetPage(pathname);
                scrollByPath[pathname] = 0;
            }, ARTICLES_PAGE_CACHE_LIFETIME * 1000);
        };
    });

    useDynamicModuleLoad({ reducers, removeAfterUnmount: false });

    return (
        <StickyContentLayout
            content={<ArticlesPageList />}
            right={<ArticlesPageFilters />}
        />
    );
};

export default memo(ArticlesPage);
