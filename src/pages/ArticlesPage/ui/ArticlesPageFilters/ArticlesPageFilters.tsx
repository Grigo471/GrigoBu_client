import { memo, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticlesPageFilters.module.scss';
import { Card } from '@/shared/ui/Card';
import { ArticlesFilters } from '@/widgets/ArticlesList';
import {
    getArticlesPageOrder,
    getArticlesPageSearch,
    getArticlesPageSort,
} from '../../model/selectors/articlesPageSelectors';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { ArticleSortField } from '@/entities/Article';
import { articlesPageActions } from '../../model/slice/ArticlesPageSlice';
import { SortOrder } from '@/shared/types';
import { useDebounce } from '@/shared/lib/hooks/useDebounce';
import { instantScrollTop } from '@/shared/lib/helpers/instantScrollTop';

interface ArticlesPageFiltersProps {
   className?: string;
}

export const ArticlesPageFilters = memo((props: ArticlesPageFiltersProps) => {
    const { className } = props;

    const dispatch = useAppDispatch();

    const order = useSelector(getArticlesPageOrder);
    const sort = useSelector(getArticlesPageSort);
    const search = useSelector(getArticlesPageSearch);

    const [searchText, setSearchText] = useState(search);

    const onChangeSort = useCallback((sort: ArticleSortField) => {
        instantScrollTop(0);
        dispatch(articlesPageActions.setSort(sort));
        dispatch(articlesPageActions.setPage(1));
    }, [dispatch]);

    const onChangeOrder = useCallback((order: SortOrder) => {
        instantScrollTop(0);
        dispatch(articlesPageActions.setOrder(order));
        dispatch(articlesPageActions.setPage(1));
    }, [dispatch]);

    const debouncedSetSearch = useDebounce(
        (search: string) => {
            instantScrollTop(0);
            dispatch(articlesPageActions.setSearch(search));
            dispatch(articlesPageActions.setPage(1));
        },
        500,
    );

    const onChangeSearch = useCallback((search: string) => {
        setSearchText(search);
        debouncedSetSearch(search);
    }, [debouncedSetSearch]);

    return (
        <Card padding="24" className={classNames(cls.ArticlesPageFilters, {}, [className])}>
            <ArticlesFilters
                order={order}
                sort={sort}
                search={searchText}
                onChangeOrder={onChangeOrder}
                onChangeSearch={onChangeSearch}
                onChangeSort={onChangeSort}
            />
        </Card>
    );
});
