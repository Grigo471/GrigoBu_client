import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { ArticlesList } from '@/widgets/ArticlesList';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import {
    getArticlesPageMyRateFilter,
    getArticlesPageTags,
} from '../../model/selectors/articlesPageSelectors';
import {
    articlesApi,
    useGetArticles,
    useArticlesListPage,
    useArticlesListPageActions,
    useArticlesMainFiltersSelector,
} from '@/entities/Article';
import { ARTICLES_PAGE_LIMIT } from '@/shared/const/articlesApi';
import { getRouteArticles } from '@/shared/const/router';

export const ArticlesPageList = memo(() => {
    const dispatch = useAppDispatch();
    const pathname = getRouteArticles();

    const { sort, order, search } = useArticlesMainFiltersSelector(pathname);
    const tags = useSelector(getArticlesPageTags);
    const myRate = useSelector(getArticlesPageMyRateFilter);
    const page = useArticlesListPage(pathname);
    const limit = ARTICLES_PAGE_LIMIT;
    const inlineTags = tags?.join(',').replaceAll(' ', '%20') || '';

    const { resetPage } = useArticlesListPageActions();

    const {
        data, isLoading, error, refetch, isFetching, originalArgs,
    } = useGetArticles({
        order, sort, search, page, limit, tags: inlineTags, myRate,
    });

    const refreshHandler = useCallback(async () => {
        window.scrollTo(0, 0);
        await resetPage(pathname);
        refetch();
    }, [refetch, pathname, resetPage]);

    const setUncollapsed = (articleId: string) => {
        if (originalArgs) {
            dispatch(articlesApi.util.updateQueryData('getArticles', originalArgs, (draft) => {
                const article = draft.find(
                    (article) => article.id === articleId,
                );
                if (article) {
                    article.uncollapsed = true;
                }
            }));
        }
    };

    return (
        <ArticlesList
            articles={data}
            page={page}
            isLoading={isLoading || isFetching}
            setUncollapsed={setUncollapsed}
            refreshHandler={refreshHandler}
        />
    );
});
