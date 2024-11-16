import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { ArticlesList } from '@/widgets/ArticlesList';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { articlesPageActions } from '../../model/slice/ArticlesPageSlice';
import {
    getArticlesPageNum, getArticlesPageOrder,
    getArticlesPageSearch, getArticlesPageSort,
    getArticlesPageTags,
} from '../../model/selectors/articlesPageSelectors';
import { articlesApi, useGetArticles } from '@/entities/Article';
import { ARTICLES_PAGE_LIMIT } from '@/shared/const/articlesApi';
import { instantScrollTop } from '@/shared/lib/helpers/instantScrollTop';

export const ArticlesPageList = memo(() => {
    const dispatch = useAppDispatch();

    const order = useSelector(getArticlesPageOrder);
    const sort = useSelector(getArticlesPageSort);
    const search = useSelector(getArticlesPageSearch);
    const page = useSelector(getArticlesPageNum);
    const tags = useSelector(getArticlesPageTags);
    const limit = ARTICLES_PAGE_LIMIT;

    const inlineTags = tags.join(',').replaceAll(' ', '%20');

    const {
        data, isLoading, error, refetch, isFetching,
    } = useGetArticles({
        order, sort, search, page, limit, tags: inlineTags,
    });

    const onLoadNextPart = () => {
        dispatch(articlesPageActions.setPage(page + 1));
    };

    const refreshHandler = useCallback(() => {
        instantScrollTop(0);
        dispatch(articlesPageActions.setPage(1));
        setTimeout(() => refetch(), 0);
    }, [dispatch, refetch]);

    const setUncollapsed = (articleId: string) => {
        dispatch(articlesApi.util.updateQueryData('getArticles', {
            order, sort, search, page, limit, tags: inlineTags,
        }, (draft) => {
            const article = draft.find(
                (article) => article.id === articleId,
            );
            if (article) {
                article.uncollapsed = true;
            }
        }));
    };

    return (
        <ArticlesList
            articles={data}
            page={page}
            isLoading={isLoading || isFetching}
            setUncollapsed={setUncollapsed}
            onLoadNextPart={onLoadNextPart}
            refreshHandler={refreshHandler}
        />
    );
});
