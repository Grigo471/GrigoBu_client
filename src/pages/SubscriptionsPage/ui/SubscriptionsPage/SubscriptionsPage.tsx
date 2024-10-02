import { memo } from 'react';
import { Page } from '@/widgets/Page';
import { ArticlesFilters, ArticlesList } from '@/widgets/ArticlesList';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';

interface SubscriptionsPageProps {
    className?: string;
}

const SubscriptionsPage = (props: SubscriptionsPageProps) => {
    const { className } = props;

    return (
        <StickyContentLayout
            right={<ArticlesFilters />}
            content={(
                <Page
                    data-testid="SubscriptionsPage"
                    className={className}
                >
                    <ArticlesList type="subscriptions" />
                </Page>
            )}
        />

    );
};

export default memo(SubscriptionsPage);
