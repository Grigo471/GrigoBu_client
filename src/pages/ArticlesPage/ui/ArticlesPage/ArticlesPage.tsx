import {
    memo, useEffect,
} from 'react';

import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { articlesPageActions, articlesPageReducer } from '../../model/slice/ArticlesPageSlice';
import { ReducerList, useDynamicModuleLoad } from '@/shared/lib/hooks/useDynamicModuleLoad';
import { ArticlesPageFilters } from '../ArticlesPageFilters/ArticlesPageFilters';
import { ArticlesPageList } from '../ArticlesPageList/ArticlesPageList';
import { ARTICLES_PAGE_CACHE_LIFETIME } from '@/shared/const/articlesApi';
import { ArticlesPageLayout } from '@/widgets/ArticlesPageLayout';
import { scrollByPath } from '@/widgets/ArticlesList';

const reducers: ReducerList = {
    articlesPage: articlesPageReducer,
};

let timer: NodeJS.Timeout;

const ArticlesPage = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (timer) clearTimeout(timer);

        return () => {
            timer = setTimeout(() => {
                dispatch(articlesPageActions.setPage(1));
                scrollByPath['/'] = 0;
            }, ARTICLES_PAGE_CACHE_LIFETIME * 1000);
        };
    });

    useDynamicModuleLoad({ reducers, removeAfterUnmount: false });

    return (
        <ArticlesPageLayout
            list={<ArticlesPageList />}
            right={<ArticlesPageFilters />}
        />
    );
};

export default memo(ArticlesPage);
