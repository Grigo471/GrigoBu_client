import { memo } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Page } from '@/widgets/Page';
import { getUsername } from '@/entities/User';
import { EditableProfileCard } from '@/features/EditableProfileCard';
import { ProfileCard } from '@/features/ProfileCard';
import { ArticlesFilters, ArticlesList } from '@/widgets/ArticlesList';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';

interface ArticlesPageProps {
    className?: string;
}

const ArticlesPage = (props: ArticlesPageProps) => {
    const { className } = props;
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
            right={<ArticlesFilters />}
            content={(
                <Page
                    data-testid="ArticlesPage"
                    className={className}
                >
                    <ArticlesList
                        type="user"
                        header={<ProfileHeader />}
                    />
                </Page>
            )}
        />

    );
};

export default memo(ArticlesPage);
