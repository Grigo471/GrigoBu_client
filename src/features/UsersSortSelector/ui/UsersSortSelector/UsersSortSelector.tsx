import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { SortOrder } from '@/shared/types';
import { ListBox, ListBoxItem } from '@/shared/ui/Popups/ui/ListBox/ListBox';
import { VStack } from '@/shared/ui/Stack';
import { UsersSortField } from '@/entities/User';
import { Text } from '@/shared/ui/Text';

interface UsersSortSelectorProps {
   className?: string;
   sort: UsersSortField;
   order: SortOrder;
   onChangeOrder: (newOrder: SortOrder) => void;
   onChangeSort: (newSort: UsersSortField) => void;
}

export const UsersSortSelector = memo((props: UsersSortSelectorProps) => {
    const {
        className, sort, order, onChangeOrder, onChangeSort,
    } = props;
    const { t } = useTranslation('users');

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
    const sortFieldOptions = useMemo<ListBoxItem<UsersSortField>[]>(() => [
        {
            value: 'rating',
            content: t('рейтингу'),
        },
        {
            value: 'createdAt',
            content: t('дате создания'),
        },
        {
            value: 'username',
            content: t('имени'),
        },
    ], [t]);

    return (

        <VStack gap="8" className={className}>
            <Text text={t('Сортировать по')} />
            <ListBox<UsersSortField>
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
