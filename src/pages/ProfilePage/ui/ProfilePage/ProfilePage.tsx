import { memo } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Page } from '@/widgets/Page';
import { getUsername } from '@/entities/User';
import { EditableProfileCard } from '@/features/EditableProfileCard';
import { ProfileCard } from '@/features/ProfileCard';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';

import { ProfilePageArticlesList } from '../ProfilePageArticlesList/ProfilePageArticlesList';
import { ProfilePageFilters } from '../ProfilePageFilters/ProfilePageFilters';

const ProfilePage = () => {
    const { username } = useParams<{ username: string }>();
    const myUsername = useSelector(getUsername);

    const ProfileHeader = memo(() => {
        if (username) {
            if (username === myUsername) return <EditableProfileCard />;
            return <ProfileCard username={username} />;
        } return null;
    });

    return (
        <StickyContentLayout
            right={<ProfilePageFilters />}
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
