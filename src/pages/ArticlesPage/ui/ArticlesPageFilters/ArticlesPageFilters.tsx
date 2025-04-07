import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Card } from '@/shared/ui/Card';
import { ArticlesFilters } from '@/widgets/ArticlesList';
import {
    getArticlesPageMyRateFilter,
    getArticlesPageTags,
    getArticlesPageTagsVisible,
} from '../../model/selectors/articlesPageSelectors';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import {
    Rate, useArticlesFilters,
    useArticlesListPageActions,
} from '@/entities/Article';
import { articlesPageActions } from '../../model/slice/ArticlesPageSlice';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Button } from '@/shared/ui/Button';
import { ArticleTagsSelector } from '@/features/ArticleTagsSelector';
import { Icon } from '@/shared/ui/Icon';
import CrossIcon from '@/shared/assets/icons/cross-delete.svg';
import { ArticleMyRateSelector } from '@/features/ArticleMyRateSelector';
import { getUserAuthData } from '@/entities/User';
import { getRouteArticles } from '@/shared/const/router';

export const ArticlesPageFilters = memo(() => {
    const dispatch = useAppDispatch();
    const { t } = useTranslation('articles');
    const pathname = getRouteArticles();
    const authData = useSelector(getUserAuthData);

    const {
        sort,
        order,
        search,
        onChangeOrder,
        onChangeSearch,
        onChangeSort,
    } = useArticlesFilters();

    const { resetPage } = useArticlesListPageActions();

    const tags = useSelector(getArticlesPageTags);
    const tagsVisible = useSelector(getArticlesPageTagsVisible);
    const myRate = useSelector(getArticlesPageMyRateFilter);

    const setTags = useCallback((tags: string[]) => {
        if (tags.length < 4) {
            window.scrollTo(0, 0);
            resetPage(pathname);
            dispatch(articlesPageActions.setTags(tags));
        }
    }, [dispatch, pathname, resetPage]);

    const toggleTagsVisible = useCallback(() => {
        if (tagsVisible) {
            window.scrollTo(0, 0);
            resetPage(pathname);
            dispatch(articlesPageActions.setTags([]));
        }
        dispatch(articlesPageActions.toggleTagsVisible());
    }, [dispatch, tagsVisible, resetPage, pathname]);

    const onChangeRate = useCallback((rate: Rate) => {
        window.scrollTo(0, 0);
        resetPage(pathname);
        if (myRate !== rate) {
            dispatch(articlesPageActions.setMyRateFilter(rate));
        } else {
            dispatch(articlesPageActions.setMyRateFilter(undefined));
        }
    }, [dispatch, myRate, pathname, resetPage]);

    return (
        <Card padding="24">
            <VStack gap="24" max mbGap="16">
                <ArticlesFilters
                    order={order}
                    sort={sort}
                    search={search}
                    onChangeOrder={onChangeOrder}
                    onChangeSearch={onChangeSearch}
                    onChangeSort={onChangeSort}
                />
                {authData && (
                    <ArticleMyRateSelector
                        rate={myRate}
                        onChange={onChangeRate}
                    />
                )}
                <VStack gap="8">
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
