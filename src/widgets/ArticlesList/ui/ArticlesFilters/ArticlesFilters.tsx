import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticlesFilters.module.scss';
import { Card } from '@/shared/ui/Card';
import { ArticleSortSelector } from '@/features/ArticleSortSelector';
import { VStack } from '@/shared/ui/Stack';
import { Input } from '@/shared/ui/Input';
import SearchIcon from '@/shared/assets/icons/search.svg';
import { Icon } from '@/shared/ui/Icon';
import { useArticlesFilters } from '../../lib/useArticlesFilters';

interface ArticleFiltersProps {
   className?: string;
}

export const ArticlesFilters = memo((props: ArticleFiltersProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const {
        order, search, sort, onChangeOrder, onChangeSearch, onChangeSort,
    } = useArticlesFilters();

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
