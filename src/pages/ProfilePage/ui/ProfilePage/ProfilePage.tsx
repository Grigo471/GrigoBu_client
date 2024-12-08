import { memo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUsername } from '@/entities/User';
import { EditableProfileCard } from '@/widgets/EditableProfileCard';
import { ProfileCard } from '@/widgets/ProfileCard';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import { ProfilePageArticlesList } from '../ProfilePageArticlesList/ProfilePageArticlesList';
import { ProfilePageFilters } from '../ProfilePageFilters/ProfilePageFilters';
import cls from './ProfilePage.module.scss';
import { ARTICLES_PAGE_CACHE_LIFETIME } from '@/shared/const/articlesApi';
import { useArticlesListPageActions } from '@/entities/Article';
import { scrollByPath } from '@/shared/lib/router/scrollByPath';

let profilePageTimer: NodeJS.Timeout;

const ProfilePage = () => {
    const username = useParams<{ username: string }>().username ?? '';
    const pathname = `/users/${username}`;
    const myUsername = useSelector(getUsername);

    const { resetPage } = useArticlesListPageActions();

    const ProfileHeader = memo(() => {
        if (username) {
            if (username === myUsername) return <EditableProfileCard className={cls.header} />;
            return <ProfileCard className={cls.header} username={username} />;
        } return null;
    });

    useEffect(() => {
        if (profilePageTimer) clearTimeout(profilePageTimer);

        return () => {
            profilePageTimer = setTimeout(() => {
                resetPage(pathname);
                scrollByPath[`/users/${username}`] = 0;
            }, ARTICLES_PAGE_CACHE_LIFETIME * 1000);
        };
    });

    return (
        <StickyContentLayout
            right={<ProfilePageFilters />}
            content={(
                <>
                    <ProfileHeader />
                    <ProfilePageArticlesList />
                </>
            )}
        />

    );
};

export default memo(ProfilePage);
