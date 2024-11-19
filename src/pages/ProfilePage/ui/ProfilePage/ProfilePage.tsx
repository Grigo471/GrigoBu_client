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
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { profilePageActions } from '../../model/slice/ProfilePageSlice';
import { ARTICLES_PAGE_CACHE_LIFETIME } from '@/shared/const/articlesApi';
import { scrollByPath } from '@/widgets/ArticlesList';

let profilePageTimer: NodeJS.Timeout;

const ProfilePage = () => {
    const username = useParams<{ username: string }>().username ?? '';
    const myUsername = useSelector(getUsername);
    const dispatch = useAppDispatch();

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
                dispatch(profilePageActions.setPage(username, 1));
                scrollByPath[`/users/${username}`] = 0;
            }, ARTICLES_PAGE_CACHE_LIFETIME * 1000);
        };
    });

    useInitialEffect(() => {
        dispatch(profilePageActions.initiatePage(username || ''));
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
