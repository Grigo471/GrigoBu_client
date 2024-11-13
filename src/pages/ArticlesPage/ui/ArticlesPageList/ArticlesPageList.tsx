import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { ArticlesList } from '@/widgets/ArticlesList';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { articlesPageActions } from '../../model/slice/ArticlesPageSlice';
import {
    getArticlesPageNum,
    getArticlesPageOrder, getArticlesPageSearch, getArticlesPageSort,
} from '../../model/selectors/articlesPageSelectors';
import { articlesApi, useGetArticles } from '@/entities/Article';
import { ARTICLES_PAGE_LIMIT } from '@/shared/const/articlesApi';

export const ArticlesPageList = memo(() => {
    const dispatch = useAppDispatch();

    const order = useSelector(getArticlesPageOrder);
    const sort = useSelector(getArticlesPageSort);
    const search = useSelector(getArticlesPageSearch);
    const page = useSelector(getArticlesPageNum);
    const limit = ARTICLES_PAGE_LIMIT;

    const {
        data, isLoading, error, isFetching, refetch,
    } = useGetArticles({
        order, sort, search, page, limit,
    });

    const onLoadNextPart = () => {
        dispatch(articlesPageActions.setPage(page + 1));
    };

    const scrollToTop = useCallback(() => {
        const virtuoso = document.getElementById('virtuoso /');
        virtuoso?.scrollTo(0, 0);
    }, []);

    const refreshHandler = useCallback(() => {
        scrollToTop();
        dispatch(articlesPageActions.setPage(1));
        setTimeout(() => refetch(), 0);
    }, [dispatch, scrollToTop, refetch]);

    const setUncollapsed = (articleId: string) => {
        dispatch(articlesApi.util.updateQueryData('getArticles', {
            order, sort, search, page, limit,
        }, (draft) => {
            const article = draft.find(
                (article) => article.id === articleId,
            );
            if (article) {
                article.uncollapsed = true;
            }
        }));
    };

    return (
        <ArticlesList
            articles={data}
            setUncollapsed={setUncollapsed}
            refreshHandler={refreshHandler}
            page={page}
            isLoading={isLoading || isFetching}
            onLoadNextPart={onLoadNextPart}
        />

    );
});
