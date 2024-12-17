import { useLocation } from 'react-router-dom';
import { useCallback, useState } from 'react';
import {
    useArticlesListOrder,
    useArticlesListSearch,
    useArticlesListSort,
} from '../../model/selectors/articlesListsPagesSelectors';
import { useArticlesListPageActions } from '../../model/slice/articlesListsPagesSlice';
import { ArticleSortField } from '../../model/consts/consts';
import { SortOrder } from '@/shared/types';
import { useDebounce } from '@/shared/lib/hooks/useDebounce';

export function useArticlesFilters() {
    const { pathname } = useLocation();

    const order = useArticlesListOrder(pathname);
    const sort = useArticlesListSort(pathname);
    const search = useArticlesListSearch(pathname);

    const {
        setOrder,
        setSearch,
        setSort,
        resetPage,
    } = useArticlesListPageActions();

    const [searchText, setSearchText] = useState(search);

    const onChangeSort = useCallback((sort: ArticleSortField) => {
        window.scrollTo(0, 0);
        resetPage(pathname);
        setSort(pathname, sort);
    }, [pathname, resetPage, setSort]);

    const onChangeOrder = useCallback((order: SortOrder) => {
        window.scrollTo(0, 0);
        resetPage(pathname);
        setOrder(pathname, order);
    }, [pathname, resetPage, setOrder]);

    const debouncedSetSearch = useDebounce(
        (search: string) => {
            window.scrollTo(0, 0);
            resetPage(pathname);
            setSearch(pathname, search);
        },
        500,
    );

    const onChangeSearch = useCallback((search: string) => {
        setSearchText(search);
        debouncedSetSearch(search);
    }, [debouncedSetSearch]);

    return {
        sort,
        order,
        search: searchText,
        onChangeOrder,
        onChangeSort,
        onChangeSearch,
    };
}
