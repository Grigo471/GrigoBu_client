import { memo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { scrollByPath } from '@/widgets/ArticlesList';

import {
    subscriptionsPageActions, subscriptionsPageReducer,
} from '../../model/slice/SubscriptionsPageSlice';
import { ReducerList, useDynamicModuleLoad } from '@/shared/lib/hooks/useDynamicModuleLoad';
import { ARTICLES_PAGE_CACHE_LIFETIME } from '@/shared/const/articlesApi';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { ArticlesPageLayout } from '@/widgets/ArticlesPageLayout';
import { SubscriptionsPageList } from '../SubscriptionsPageList/SubscriptionsPageList';
import { SubscriptionsPageFilters } from '../SubscriptionsPageFilters/SubscriptionsPageFilters';

let timer: NodeJS.Timeout;

const reducers: ReducerList = {
    subscriptionsPage: subscriptionsPageReducer,
};

const SubscriptionsPage = () => {
    const dispatch = useAppDispatch();
    const { pathname } = useLocation();

    useEffect(() => {
        if (timer) clearTimeout(timer);

        return () => {
            timer = setTimeout(() => {
                dispatch(subscriptionsPageActions.setPage(1));
                scrollByPath[pathname] = 0;
            }, ARTICLES_PAGE_CACHE_LIFETIME * 1000);
        };
    });

    useDynamicModuleLoad({ reducers, removeAfterUnmount: false });

    return (
        <ArticlesPageLayout
            list={<SubscriptionsPageList />}
            right={<SubscriptionsPageFilters />}
        />
    );
};

export default memo(SubscriptionsPage);
