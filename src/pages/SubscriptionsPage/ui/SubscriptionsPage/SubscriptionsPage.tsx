import { memo } from 'react';
import { useSelector } from 'react-redux';
import { Page } from '@/widgets/Page';
import { ArticlesList } from '@/widgets/ArticlesList';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import {
    getSubscriptionsPageLimit,
    getSubscriptionsPageNum,
    getSubscriptionsPageOrder,
    getSubscriptionsPageSearch,
    getSubscriptionsPageSort,
} from '../../model/selectors/subscriptionsPageSelectors';
import { useGetSubscriptions } from '@/entities/Article';
import {
    subscriptionsPageActions, subscriptionsPageReducer,
} from '../../model/slice/SubscriptionsPageSlice';
import { ReducerList, useDynamicModuleLoad } from '@/shared/lib/hooks/useDynamicModuleLoad';

interface SubscriptionsPageProps {
    className?: string;
}

const reducers: ReducerList = {
    subscriptionsPage: subscriptionsPageReducer,
};

const SubscriptionsPage = (props: SubscriptionsPageProps) => {
    const { className } = props;

    const dispatch = useAppDispatch();

    const order = useSelector(getSubscriptionsPageOrder);
    const sort = useSelector(getSubscriptionsPageSort);
    const search = useSelector(getSubscriptionsPageSearch);
    const page = useSelector(getSubscriptionsPageNum);
    const limit = useSelector(getSubscriptionsPageLimit);

    const { data, isLoading, error } = useGetSubscriptions({
        order, sort, search, page, limit,
    });

    const onLoadNextPart = () => {
        dispatch(subscriptionsPageActions.setPage(page + 1));
    };

    useDynamicModuleLoad({ reducers, removeAfterUnmount: false });

    return (
        <StickyContentLayout
            // right={<ArticlesFilters />}
            content={(
                <Page
                    data-testid="SubscriptionsPage"
                    className={className}
                >
                    <ArticlesList
                        articles={data}
                        isLoading={isLoading}
                        onLoadNextPart={onLoadNextPart}
                    />
                </Page>
            )}
        />

    );
};

export default memo(SubscriptionsPage);
