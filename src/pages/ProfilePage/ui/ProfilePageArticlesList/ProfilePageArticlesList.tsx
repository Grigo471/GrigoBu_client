import { memo, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import {
    getProfilePageNum,
    getProfilePageOrder,
    getProfilePageSearch,
    getProfilePageSort,
} from '../../model/selectors/profilePageSelectors';
import { articlesApi, useGetUserArticles } from '@/entities/Article';
import { profilePageActions } from '../../model/slice/ProfilePageSlice';
import { StateSchema } from '@/app/providers/StoreProvider';
import { ARTICLES_PAGE_LIMIT } from '@/shared/const/articlesApi';
import { ArticlesList } from '@/widgets/ArticlesList';

export const ProfilePageArticlesList = memo(() => {
    const dispatch = useAppDispatch();
    const username = useParams<{ username: string }>().username ?? '';

    const order = useSelector((state: StateSchema) => getProfilePageOrder(state, username));
    const sort = useSelector((state: StateSchema) => getProfilePageSort(state, username));
    const search = useSelector((state: StateSchema) => getProfilePageSearch(state, username));
    const page = useSelector((state: StateSchema) => getProfilePageNum(state, username));
    const limit = ARTICLES_PAGE_LIMIT;

    const {
        data, isLoading, error, isFetching, refetch,
    } = useGetUserArticles({
        order, sort, search, page, limit, username,
    });

    const onLoadNextPart = () => {
        dispatch(profilePageActions.setPage(username, page + 1));
    };

    const refreshHandler = useCallback(async () => {
        window.scrollTo(0, 0);
        await dispatch(profilePageActions.setPage(username, 1));
        refetch();
    }, [dispatch, refetch, username]);

    const setUncollapsed = (articleId: string) => {
        dispatch(articlesApi.util.updateQueryData('getUserArticles', {
            order, sort, search, page, limit, username,
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
            onLoadNextPart={onLoadNextPart}
            setUncollapsed={setUncollapsed}
            refreshHandler={refreshHandler}
        />
    );
});
