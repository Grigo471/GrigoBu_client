import { memo, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Card } from '@/shared/ui/Card';
import { ArticlesFilters } from '@/widgets/ArticlesList';
import {
    getArticlesPageOrder,
    getArticlesPageSearch,
    getArticlesPageSort,
    getArticlesPageTags,
    getArticlesPageTagsVisible,
} from '../../model/selectors/articlesPageSelectors';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { ArticleSortField } from '@/entities/Article';
import { articlesPageActions } from '../../model/slice/ArticlesPageSlice';
import { SortOrder } from '@/shared/types';
import { useDebounce } from '@/shared/lib/hooks/useDebounce';
import { instantScrollTop } from '@/shared/lib/helpers/instantScrollTop';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import { Button } from '@/shared/ui/Button';
import { ArticleTagsSelector } from '@/features/ArticleTagsSelector';
import { Icon } from '@/shared/ui/Icon';
import CrossIcon from '@/shared/assets/icons/cross-delete.svg';
import { Radio, RadioItem } from '@/shared/ui/Radio';

type RateFilter = 'liked' | 'disliked';

export const ArticlesPageFilters = memo(() => {
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const [rateFilter, setRateFilter] = useState<RateFilter>('liked');

    const radioItems: RadioItem<RateFilter>[] = [
        {
            value: 'liked',
            label: 'liked',
        },
        {
            value: 'disliked',
            label: 'disliked',
        },
    ];

    const order = useSelector(getArticlesPageOrder);
    const sort = useSelector(getArticlesPageSort);
    const search = useSelector(getArticlesPageSearch);
    const tags = useSelector(getArticlesPageTags);
    const tagsVisible = useSelector(getArticlesPageTagsVisible);

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

    const setTags = useCallback((tags: string[]) => {
        if (tags.length < 4) {
            instantScrollTop(0);
            dispatch(articlesPageActions.setTags(tags));
            dispatch(articlesPageActions.setPage(1));
        }
    }, [dispatch]);

    const toggleTagsVisible = useCallback(() => {
        dispatch(articlesPageActions.toggleTagsVisible());
    }, [dispatch]);

    return (
        <Card padding="24">
            <VStack gap="16" max>
                <ArticlesFilters
                    order={order}
                    sort={sort}
                    search={searchText}
                    onChangeOrder={onChangeOrder}
                    onChangeSearch={onChangeSearch}
                    onChangeSort={onChangeSort}
                />
                <Radio<RateFilter>
                    items={radioItems}
                    name=""
                    value={rateFilter}
                    onChange={(value) => setRateFilter(value)}
                />
                <VStack>
                    <Text bold text={t('Моя оценка')} />
                    <HStack gap="16">
                        <Text text={t('Плюс')} />
                        <Text text={t('Минус')} />
                    </HStack>
                </VStack>
                <VStack>
                    <Button
                        variant="clear"
                        onClick={toggleTagsVisible}
                    >
                        <HStack gap="8">
                            {t('Поиск по тегам')}
                            {tagsVisible
                            && <Icon clickable Svg={CrossIcon} width={10} height={10} />}
                        </HStack>
                    </Button>
                    {tagsVisible
                    && <ArticleTagsSelector chosenTags={tags} setChosenTags={setTags} />}
                </VStack>
            </VStack>
        </Card>
    );
});
