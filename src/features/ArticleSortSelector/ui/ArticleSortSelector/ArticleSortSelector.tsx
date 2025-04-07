import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { SortOrder } from '@/shared/types';
import { ArticleSortField } from '@/entities/Article';
import { ListBox } from '@/shared/ui/Popups';
import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import { ListBoxItem } from '@/shared/ui/Popups/ui/ListBox/ListBox';

interface ArticleSortSelectorProps {
    className?: string;
    sort: ArticleSortField;
    order: SortOrder;
    onChangeOrder: (newOrder: SortOrder) => void;
    onChangeSort: (newSort: ArticleSortField) => void;
}

export const ArticleSortSelector = memo((props: ArticleSortSelectorProps) => {
    const {
        className, sort, order, onChangeOrder, onChangeSort,
    } = props;
    const { t } = useTranslation('articles');

    const orderOptions = useMemo<ListBoxItem<SortOrder>[]>(() => [
        {
            value: 'desc',
            content: t('убыванию'),
        },
        {
            value: 'asc',
            content: t('возрастанию'),
        },
    ], [t]);
    const sortFieldOptions = useMemo<ListBoxItem<ArticleSortField>[]>(() => [
        {
            value: 'createdAt',
            content: t('дате создания'),
        },
        {
            value: 'rating',
            content: t('рейтингу'),
        },
    ], [t]);

    return (
        <VStack gap="8" className={className} adaptive mbAlign="center">
            <Text text={t('Сортировать по')} />
            <ListBox<ArticleSortField>
                items={sortFieldOptions}
                value={sort}
                onChange={onChangeSort}
            />
            <ListBox<SortOrder>
                items={orderOptions}
                value={order}
                onChange={onChangeOrder}
            />
        </VStack>
    );
});
