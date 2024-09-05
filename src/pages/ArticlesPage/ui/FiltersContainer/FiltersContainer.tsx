import { memo } from 'react';
import { ArticlesFilters } from '@/widgets/ArticleFilters';
import { useArticlesFilters } from '../lib/hooks/useArticlesFilters';

interface FiltersContainerProps {
   className?: string;
}

export const FiltersContainer = memo((props: FiltersContainerProps) => {
    const { className } = props;

    const {
        sort,
        search,
        order,
        onChangeOrder,
        onChangeSearch,
        onChangeSort,
    } = useArticlesFilters();

    return (
        <ArticlesFilters
            order={order}
            search={search}
            sort={sort}
            onChangeOrder={onChangeOrder}
            onChangeSearch={onChangeSearch}
            onChangeSort={onChangeSort}
            className={className}
        />
    );
});
