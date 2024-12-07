import { memo, useEffect } from 'react';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';

import { subscriptionsPageReducer } from '../../model/slice/SubscriptionsPageSlice';
import { ReducerList, useDynamicModuleLoad } from '@/shared/lib/hooks/useDynamicModuleLoad';
import { scrollByPath } from '@/widgets/ArticlesList';
import { ARTICLES_PAGE_CACHE_LIFETIME } from '@/shared/const/articlesApi';
import { SubscriptionsPageList } from '../SubscriptionsPageList/SubscriptionsPageList';
import { SubscriptionsPageFilters } from '../SubscriptionsPageFilters/SubscriptionsPageFilters';
import { articlesListsPagesActions } from '@/entities/Article';
import { getRouteSubscriptions } from '@/shared/const/router';

const reducers: ReducerList = {
    subscriptionsPage: subscriptionsPageReducer,
};

let subscriptionsPageTimer: NodeJS.Timeout;

const SubscriptionsPage = () => {
    const dispatch = useAppDispatch();
    const pathname = getRouteSubscriptions();

    useEffect(() => {
        if (subscriptionsPageTimer) clearTimeout(subscriptionsPageTimer);

        return () => {
            subscriptionsPageTimer = setTimeout(() => {
                dispatch(articlesListsPagesActions.setPage(pathname, 1));
                scrollByPath['/subs'] = 0;
            }, ARTICLES_PAGE_CACHE_LIFETIME * 1000);
        };
    });

    useDynamicModuleLoad({ reducers, removeAfterUnmount: false });

    return (
        <StickyContentLayout
            content={<SubscriptionsPageList />}
            right={<SubscriptionsPageFilters />}
        />
    );
};

export default memo(SubscriptionsPage);
