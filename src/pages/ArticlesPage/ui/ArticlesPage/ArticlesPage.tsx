import { memo } from 'react';
import { useSelector } from 'react-redux';
import { Page } from '@/widgets/Page';
import { ArticlesList } from '@/widgets/ArticlesList';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import {
    getArticlesPageLimit,
    getArticlesPageNum,
    getArticlesPageOrder,
    getArticlesPageSearch,
    getArticlesPageSort,
} from '../../model/selectors/articlesPageSelectors';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { articlesPageActions, articlesPageReducer } from '../../model/slice/ArticlesPageSlice';
import { ReducerList, useDynamicModuleLoad } from '@/shared/lib/hooks/useDynamicModuleLoad';
import { ArticlesPageFilters } from '../ArticlesPageFilters/ArticlesPageFilters';
import { useGetArticles } from '@/entities/Article';

interface ArticlesPageProps {
   className?: string;
}

const reducers: ReducerList = {
    articlesPage: articlesPageReducer,
};

const ArticlesPage = (props: ArticlesPageProps) => {
    const { className } = props;
    const dispatch = useAppDispatch();

    const order = useSelector(getArticlesPageOrder);
    const sort = useSelector(getArticlesPageSort);
    const search = useSelector(getArticlesPageSearch);
    const page = useSelector(getArticlesPageNum);
    const limit = useSelector(getArticlesPageLimit);

    const { data, isLoading, error } = useGetArticles({
        order, sort, search, page, limit,
    });

    const onLoadNextPart = () => {
        dispatch(articlesPageActions.setPage(page + 1));
    };

    useDynamicModuleLoad({ reducers, removeAfterUnmount: false });

    return (
        <StickyContentLayout
            right={<ArticlesPageFilters />}
            content={(
                <Page
                    data-testid="ArticlesPage"
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

export default memo(ArticlesPage);
