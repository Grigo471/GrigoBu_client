import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticlesFilters.module.scss';
import { Card } from '@/shared/ui/Card';
import { ArticleSortSelector } from '@/features/ArticleSortSelector';
import { VStack } from '@/shared/ui/Stack';
import { SortOrder } from '@/shared/types';
import { ArticleSortField } from '@/entities/Article';
import { Input } from '@/shared/ui/Input';
import SearchIcon from '@/shared/assets/icons/search.svg';
import { Icon } from '@/shared/ui/Icon';

interface ArticleFiltersProps {
   className?: string;
   order: SortOrder;
   sort: ArticleSortField;
   search: string;
   onChangeOrder: (order: SortOrder) => void;
   onChangeSort: (sort: ArticleSortField) => void;
   onChangeSearch: (search: string) => void;
}

export const ArticlesFilters = memo((props: ArticleFiltersProps) => {
    const {
        className, order,
        sort, search,
        onChangeOrder, onChangeSearch,
        onChangeSort,
    } = props;
    const { t } = useTranslation();

    return (
        <Card padding="24" className={classNames(cls.ArticleFilters, {}, [className])}>
            <VStack gap="32">
                <Input
                    size="s"
                    addonLeft={<Icon Svg={SearchIcon} />}
                    value={search}
                    onChange={onChangeSearch}
                    placeholder={t('Поиск')}
                />
                {/* <ArticleTypeTabs
                    value={type}
                    onChangeType={onChangeType}
                    className={cls.tabs}
                /> */}
                <ArticleSortSelector
                    order={order}
                    sort={sort}
                    onChangeOrder={onChangeOrder}
                    onChangeSort={onChangeSort}
                />
            </VStack>
        </Card>
    );
});
