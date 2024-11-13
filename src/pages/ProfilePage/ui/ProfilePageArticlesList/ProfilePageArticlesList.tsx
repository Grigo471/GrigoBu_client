import { memo } from 'react';
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
import { ArticlesList } from '@/widgets/ArticlesList';
import { ARTICLES_PAGE_LIMIT } from '@/shared/const/articlesApi';
import { StateSchema } from '@/app/providers/StoreProvider';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect';

export const ProfilePageArticlesList = memo(() => {
    const dispatch = useAppDispatch();
    const username = useParams<{ username: string }>().username ?? '';

    const order = useSelector((state: StateSchema) => getProfilePageOrder(state, username));
    const sort = useSelector((state: StateSchema) => getProfilePageSort(state, username));
    const search = useSelector((state: StateSchema) => getProfilePageSearch(state, username));
    const page = useSelector((state: StateSchema) => getProfilePageNum(state, username));
    const limit = ARTICLES_PAGE_LIMIT;

    const { data, isLoading, error } = useGetUserArticles({
        order, sort, search, page, limit, username,
    });

    const onLoadNextPart = () => {
        dispatch(profilePageActions.setPage(username, page + 1));
    };

    useInitialEffect(() => {
        dispatch(profilePageActions.initiatePage(username || ''));
    });

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
            isLoading={isLoading}
            onLoadNextPart={onLoadNextPart}
            setUncollapsed={setUncollapsed}
        />
    );
});
