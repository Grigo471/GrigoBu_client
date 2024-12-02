import { memo, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ArticlesList } from '@/widgets/ArticlesList';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { articlesPageActions } from '../../model/slice/ArticlesPageSlice';
import {
    getArticlesPageMyRateFilter,
    getArticlesPageNum, getArticlesPageOrder,
    getArticlesPageSearch, getArticlesPageSort,
    getArticlesPageTags,
} from '../../model/selectors/articlesPageSelectors';
import { articlesApi, useGetArticles } from '@/entities/Article';
import { ARTICLES_PAGE_LIMIT } from '@/shared/const/articlesApi';

export const ArticlesPageList = memo(() => {
    const dispatch = useAppDispatch();

    const order = useSelector(getArticlesPageOrder);
    const sort = useSelector(getArticlesPageSort);
    const search = useSelector(getArticlesPageSearch);
    const page = useSelector(getArticlesPageNum);
    const tags = useSelector(getArticlesPageTags);
    const myRate = useSelector(getArticlesPageMyRateFilter);
    const limit = ARTICLES_PAGE_LIMIT;

    const inlineTags = tags?.join(',').replaceAll(' ', '%20') || '';

    const {
        data, isLoading, error, refetch, isFetching, originalArgs,
    } = useGetArticles({
        order, sort, search, page, limit, tags: inlineTags, myRate,
    });

    const onLoadNextPart = () => {
        dispatch(articlesPageActions.setPage(page + 1));
    };

    const refreshHandler = useCallback(async () => {
        window.scrollTo(0, 0);
        await dispatch(articlesPageActions.setPage(1));
        refetch();
    }, [dispatch, refetch]);

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

    useEffect(() => {
        if (data && !isFetching && !isLoading && data.length > page * limit) {
            dispatch(articlesPageActions.setPage(Math.ceil(data.length / limit)));
        }
    });

    return (
        <ArticlesList
            articles={data}
            page={page}
            isLoading={isLoading || isFetching}
            setUncollapsed={setUncollapsed}
            onLoadNextPart={onLoadNextPart}
            refreshHandler={refreshHandler}
        />
    );
});
