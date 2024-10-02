import { useSelector } from 'react-redux';
import { useCallback } from 'react';
import {
    getArticlesListOrder, getArticlesListSearch,
    getArticlesListSort,
} from '../model/selectors/articlesListSelectors';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { articlesListActions } from '../model/slice/articlesListSlice';
import { ArticleSortField } from '@/entities/Article';
import { SortOrder } from '@/shared/types';
import { fetchArticlesList } from '../model/services/fetchArticlesList/fetchArticlesList';
import { useDebounce } from '@/shared/lib/hooks/useDebounce';

export function useArticlesFilters() {
    const dispatch = useAppDispatch();

    const order = useSelector(getArticlesListOrder);
    const sort = useSelector(getArticlesListSort);
    const search = useSelector(getArticlesListSearch);

    const fetchData = useCallback(() => {
        dispatch(fetchArticlesList({ replace: true }));
    }, [dispatch]);

    const debouncedFetchData = useDebounce(fetchData, 500);

    const onChangeSort = useCallback((sort: ArticleSortField) => {
        dispatch(articlesListActions.setSort(sort));
        dispatch(articlesListActions.setPage(1));
        fetchData();
    }, [dispatch, fetchData]);

    const onChangeOrder = useCallback((order: SortOrder) => {
        dispatch(articlesListActions.setOrder(order));
        dispatch(articlesListActions.setPage(1));
        fetchData();
    }, [dispatch, fetchData]);

    const onChangeSearch = useCallback((search: string) => {
        dispatch(articlesListActions.setSearch(search));
        dispatch(articlesListActions.setPage(1));
        debouncedFetchData();
    }, [dispatch, debouncedFetchData]);

    return {
        order,
        sort,
        search,
        onChangeOrder,
        onChangeSort,
        onChangeSearch,
    };
}
