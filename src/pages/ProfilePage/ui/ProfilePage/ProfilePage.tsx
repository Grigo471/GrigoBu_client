import { memo } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Page } from '@/widgets/Page';
import { getUsername } from '@/entities/User';
import { EditableProfileCard } from '@/features/EditableProfileCard';
import { ProfileCard } from '@/features/ProfileCard';
import { ArticlesList } from '@/widgets/ArticlesList';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import {
    getProfilePageLimit,
    getProfilePageNum,
    getProfilePageOrder,
    getProfilePageSearch,
    getProfilePageSort,
} from '../../model/selectors/profilePageSelectors';
import { useGetUserArticles } from '@/entities/Article';
import { profilePageActions, profilePageReducer } from '../../model/slice/ProfilePageSlice';
import { ReducerList, useDynamicModuleLoad } from '@/shared/lib/hooks/useDynamicModuleLoad';

interface ArticlesPageProps {
    className?: string;
}

const reducers: ReducerList = {
    profilePage: profilePageReducer,
};

const ArticlesPage = (props: ArticlesPageProps) => {
    const { className } = props;
    const { username } = useParams<{ username: string }>();
    const myUsername = useSelector(getUsername);

    const dispatch = useAppDispatch();

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

    useDynamicModuleLoad({ reducers, removeAfterUnmount: false });

    const ProfileHeader = memo(() => {
        if (username) {
            if (username === myUsername) return <EditableProfileCard />;
            return <ProfileCard username={username} />;
        } return null;
    });

    return (
        <StickyContentLayout
            // right={<ArticlesFilters />}
            content={(
                <Page
                    data-testid="ArticlesPage"
                    className={className}
                >
                    <ProfileHeader />
                    <ArticlesList
                        articles={data}
                        isLoading={isLoading}
                        onLoadNextPart={onLoadNextPart}
                    />
                </Page>
            )}
        />

    );
};

export default memo(ArticlesPage);
