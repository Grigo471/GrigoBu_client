import { memo, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { Page } from '@/widgets/Page';
import cls from './ArticlesPage.module.scss';
import {
    fetchNextArticlesPage,
} from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import { FiltersContainer } from '../FiltersContainer/FiltersContainer';
import { getUsername } from '@/entities/User';
import { EditableProfileCard } from '@/features/EditableProfileCard';
import { ProfileCard } from '@/features/ProfileCard';

interface ArticlesPageProps {
   className?: string;
}

const ArticlesPage = (props: ArticlesPageProps) => {
    const { className } = props;
    const dispatch = useAppDispatch();
    const { username } = useParams<{ username: string }>();
    const myUsername = useSelector(getUsername);

    const ProfileHeader = memo(() => {
        if (username) {
            if (username === myUsername) return <EditableProfileCard />;
            return <ProfileCard username={username} />;
        } return null;
    });

    const onLoadNextPart = useCallback(() => {
        dispatch(fetchNextArticlesPage());
    }, [dispatch]);

    return (

        <StickyContentLayout
            right={<FiltersContainer />}
            content={(
                <Page
                    data-testid="ArticlesPage"
                    onScrollEnd={onLoadNextPart}
                    className={classNames(cls.ArticlesPageRedesigned, {}, [className])}
                >
                    <ProfileHeader />
                    {/* <ArticlesInfiniteList className={cls.list} /> */}
                </Page>
            )}
        />

    );
};

export default memo(ArticlesPage);
