import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { ArticlesList } from '@/widgets/ArticlesList';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { articlesPageActions } from '../../model/slice/ArticlesPageSlice';
import {
    getArticlesPageLimit, getArticlesPageNum,
    getArticlesPageOrder, getArticlesPageSearch, getArticlesPageSort,
    getArticlesPageUncollapsed,
} from '../../model/selectors/articlesPageSelectors';
import { useGetArticles } from '@/entities/Article';

export const ArticlesPageList = memo(() => {
    const dispatch = useAppDispatch();

    const order = useSelector(getArticlesPageOrder);
    const sort = useSelector(getArticlesPageSort);
    const search = useSelector(getArticlesPageSearch);
    const page = useSelector(getArticlesPageNum);
    const limit = useSelector(getArticlesPageLimit);
    const uncollapsedCards = useSelector(getArticlesPageUncollapsed);

    const {
        data, isLoading, error, isFetching,
    } = useGetArticles({
        order, sort, search, page, limit,
    });

    const onLoadNextPart = () => {
        dispatch(articlesPageActions.setPage(page + 1));
    };

    const setUncollapsed = useCallback((articleId: string) => {
        dispatch(articlesPageActions.addUnCollapsedCards(articleId));
    }, [dispatch]);

    return (
        <ArticlesList
            articles={data}
            uncollapsedCards={uncollapsedCards}
            setUncollapsed={setUncollapsed}
            page={page}
            isLoading={isLoading || isFetching}
            onLoadNextPart={onLoadNextPart}
        />
    );
});
