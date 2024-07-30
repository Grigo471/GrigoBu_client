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
        type,
        order,
        onChangeOrder,
        onChangeSearch,
        onChangeSort,
        onChangeType,
    } = useArticlesFilters();

    return (
        <ArticlesFilters
            order={order}
            type={type}
            search={search}
            sort={sort}
            onChangeOrder={onChangeOrder}
            onChangeSearch={onChangeSearch}
            onChangeSort={onChangeSort}
            onChangeType={onChangeType}
            className={className}
        />
    );
});
