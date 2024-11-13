import {
    memo, useCallback, useState,
} from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticlesPageFilters.module.scss';
import { Card } from '@/shared/ui/Card';
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
import { ArticleTagsSelector } from '@/features/ArticleTagsSelector';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import CrossIcon from '@/shared/assets/icons/cross-delete.svg';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import { ArticlesFilters } from '@/widgets/ArticlesList/ui/ArticlesFilters/ArticlesFilters';

interface ArticlesPageFiltersProps {
   className?: string;
}

export const ArticlesPageFilters = memo((props: ArticlesPageFiltersProps) => {
    const { className } = props;
    const { t } = useTranslation();

    const dispatch = useAppDispatch();

    const order = useSelector(getArticlesPageOrder);
    const sort = useSelector(getArticlesPageSort);
    const search = useSelector(getArticlesPageSearch);
    const tags = useSelector(getArticlesPageTags);
    const tagsVisible = useSelector(getArticlesPageTagsVisible);

    const [searchText, setSearchText] = useState(search);

    const scrollToTop = useCallback(() => {
        const virtuoso = document.getElementById('virtuoso /');
        virtuoso?.scrollTo(0, 0);
    }, []);

    const onChangeSort = useCallback((sort: ArticleSortField) => {
        scrollToTop();
        dispatch(articlesPageActions.setSort(sort));
        dispatch(articlesPageActions.setPage(1));
    }, [dispatch, scrollToTop]);

    const onChangeOrder = useCallback((order: SortOrder) => {
        scrollToTop();
        dispatch(articlesPageActions.setOrder(order));
        dispatch(articlesPageActions.setPage(1));
    }, [dispatch, scrollToTop]);

    const debouncedSetSearch = useDebounce(
        (search: string) => {
            dispatch(articlesPageActions.setSearch(search));
            dispatch(articlesPageActions.setPage(1));
            scrollToTop();
        },
        500,
    );

    const onChangeSearch = useCallback((search: string) => {
        setSearchText(search);
        debouncedSetSearch(search);
    }, [debouncedSetSearch]);

    const setTags = useCallback((tags: string[]) => {
        dispatch(articlesPageActions.setTags(tags));
    }, [dispatch]);

    const toggleTagsVisible = useCallback(() => {
        dispatch(articlesPageActions.toggleTagsVisible());
    }, [dispatch]);

    // useInitialEffect(() => {
    //     ref.current?.addEventListener('wheel', (e) => {
    //         const virtuoso = document.getElementById('virtuoso /');
    //         if (virtuoso) {
    //             virtuoso.scrollTop += e.deltaY / 3;
    //         }
    //     });
    // });

    return (
        <div
            className={classNames(cls.ArticlesPageFilters, {}, [className])}
        >
            <Card padding="24" max className={cls.card}>
                <VStack gap="16" max>
                    <ArticlesFilters
                        className={cls.filters}
                        order={order}
                        sort={sort}
                        search={searchText}
                        onChangeOrder={onChangeOrder}
                        onChangeSearch={onChangeSearch}
                        onChangeSort={onChangeSort}
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
                            className={cls.btn}
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
        </div>
    );
});
