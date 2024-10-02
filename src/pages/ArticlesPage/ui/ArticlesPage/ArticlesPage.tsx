import { memo } from 'react';
import { Page } from '@/widgets/Page';
import { ArticlesFilters, ArticlesList } from '@/widgets/ArticlesList';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';

interface ArticlesPageProps {
   className?: string;
}

const ArticlesPage = (props: ArticlesPageProps) => {
    const { className } = props;

    return (
        <StickyContentLayout
            right={<ArticlesFilters />}
            content={(
                <Page
                    data-testid="ArticlesPage"
                    className={className}
                >
                    <ArticlesList />
                </Page>
            )}
        />

    );
};

export default memo(ArticlesPage);
