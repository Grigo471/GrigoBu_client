import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ArticleSortSelector } from '@/features/ArticleSortSelector';
import { VStack } from '@/shared/ui/Stack';
import { Input } from '@/shared/ui/Input';
import SearchIcon from '@/shared/assets/icons/search.svg';
import { Icon } from '@/shared/ui/Icon';
import { SortOrder } from '@/shared/types';
import { ArticleSortField } from '@/entities/Article';

interface ArticleFiltersProps {
    order: SortOrder;
    search: string;
    sort: ArticleSortField;
    onChangeOrder: (order: SortOrder) => void;
    onChangeSearch: (search: string) => void;
    onChangeSort: (sort: ArticleSortField) => void;
}

export const ArticlesFilters = memo((props: ArticleFiltersProps) => {
    const {
        order, search, sort, onChangeOrder, onChangeSearch, onChangeSort,
    } = props;
    const { t } = useTranslation();

    return (
        <VStack gap="32">
            <Input
                size="s"
                addonLeft={<Icon Svg={SearchIcon} />}
                value={search}
                onChange={onChangeSearch}
                placeholder={t('Поиск')}
            />
            <ArticleSortSelector
                order={order}
                sort={sort}
                onChangeOrder={onChangeOrder}
                onChangeSort={onChangeSort}
            />
        </VStack>
    );
});
