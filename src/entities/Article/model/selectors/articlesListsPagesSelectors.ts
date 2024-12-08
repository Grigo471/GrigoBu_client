import { StateSchema } from '@/app/providers/StoreProvider';
import { buildSelector } from '@/shared/lib/store';

export const [useArticlesListPage] = buildSelector(
    (state: StateSchema, pathname: string) => state
        .articlesListsPages.pages[pathname] || 1,
);

export const [useArticlesListSort] = buildSelector(
    (state: StateSchema, pathname: string) => state
        .articlesListsPages.sorts[pathname] || 'createdAt',
);

export const [useArticlesListOrder] = buildSelector(
    (state: StateSchema, pathname: string) => state
        .articlesListsPages.orders[pathname] || 'desc',
);

export const [useArticlesListSearch] = buildSelector(
    (state: StateSchema, pathname: string) => state
        .articlesListsPages.searches[pathname] || '',
);

export function useArticlesMainFiltersSelector(pathname: string) {
    const order = useArticlesListOrder(pathname);
    const sort = useArticlesListSort(pathname);
    const search = useArticlesListSearch(pathname);
    return {
        sort, order, search,
    };
}
