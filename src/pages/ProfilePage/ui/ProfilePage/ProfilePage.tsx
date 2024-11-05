import { memo } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Page } from '@/widgets/Page';
import { getUsername } from '@/entities/User';
import { EditableProfileCard } from '@/features/EditableProfileCard';
import { ProfileCard } from '@/features/ProfileCard';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';

import { profilePageReducer } from '../../model/slice/ProfilePageSlice';
import { ReducerList, useDynamicModuleLoad } from '@/shared/lib/hooks/useDynamicModuleLoad';
import { ProfilePageArticlesList } from '../ProfilePageArticlesList/ProfilePageArticlesList';

const reducers: ReducerList = {
    profilePage: profilePageReducer,
};

const ProfilePage = () => {
    const { username } = useParams<{ username: string }>();
    const myUsername = useSelector(getUsername);

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
                    data-testid="ProfilePage"
                >
                    <ProfileHeader />
                    <ProfilePageArticlesList />
                </Page>
            )}
        />

    );
};

export default memo(ProfilePage);
