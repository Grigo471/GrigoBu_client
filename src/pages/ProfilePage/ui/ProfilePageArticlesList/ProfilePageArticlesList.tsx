import { memo } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ArticlesList } from '@/widgets/ArticlesList';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import {
    getProfilePageLimit,
    getProfilePageNum,
    getProfilePageOrder,
    getProfilePageSearch,
    getProfilePageSort,
} from '../../model/selectors/profilePageSelectors';
import { useGetUserArticles } from '@/entities/Article';
import { profilePageActions } from '../../model/slice/ProfilePageSlice';

export const ProfilePageArticlesList = memo(() => {
    const dispatch = useAppDispatch();
    const { username } = useParams<{ username: string }>();

    const order = useSelector(getProfilePageOrder);
    const sort = useSelector(getProfilePageSort);
    const search = useSelector(getProfilePageSearch);
    const page = useSelector(getProfilePageNum);
    const limit = useSelector(getProfilePageLimit);

    const { data, isLoading, error } = useGetUserArticles({
        order, sort, search, page, limit, username,
    });

    const onLoadNextPart = () => {
        dispatch(profilePageActions.setPage(page + 1));
    };

    return (
        <ArticlesList
            articles={data}
            isLoading={isLoading}
            onLoadNextPart={onLoadNextPart}
        />
    );
});
