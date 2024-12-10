import { memo, useEffect } from 'react';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import { ARTICLES_PAGE_CACHE_LIFETIME } from '@/shared/const/articlesApi';
import { SubscriptionsPageList } from '../SubscriptionsPageList/SubscriptionsPageList';
import { SubscriptionsPageFilters } from '../SubscriptionsPageFilters/SubscriptionsPageFilters';
import { useArticlesListPageActions } from '@/entities/Article';
import { getRouteSubscriptions } from '@/shared/const/router';
import { resetVirtuosoSatetByPath } from '@/shared/lib/virtuosoState/virtuosoStateByPathname';

let subscriptionsPageTimer: NodeJS.Timeout;

const SubscriptionsPage = () => {
    const pathname = getRouteSubscriptions();
    const { resetPage } = useArticlesListPageActions();

    useEffect(() => {
        if (subscriptionsPageTimer) clearTimeout(subscriptionsPageTimer);

        return () => {
            subscriptionsPageTimer = setTimeout(() => {
                resetPage(pathname);
                resetVirtuosoSatetByPath(pathname);
            }, ARTICLES_PAGE_CACHE_LIFETIME * 1000);
        };
    });

    return (
        <StickyContentLayout
            content={<SubscriptionsPageList />}
            right={<SubscriptionsPageFilters />}
        />
    );
};

export default memo(SubscriptionsPage);
