import { memo, HTMLAttributeAnchorTarget } from 'react';
import { useTranslation } from 'react-i18next';
import { Virtuoso } from 'react-virtuoso';
import { Article } from '../../model/types/article';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';
import { HStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

interface ArticleListProps {
   className?: string;
   articles: Article[];
   isLoading?: boolean;
   target?: HTMLAttributeAnchorTarget;
}

export const ArticleList = memo((props: ArticleListProps) => {
    const {
        className,
        articles,
        isLoading,
        target,
    } = props;
    const { t } = useTranslation('article');

    const renderArticle = (article: Article) => (
        <ArticleListItem
            article={article}
            key={article.id}
            target={target}
        />
    );

    const getSkeletons = () => new Array(3)
        .fill(0)
        .map((item, index) => (
            <ArticleListItemSkeleton key={index} />
        ));

    if (!isLoading && !articles.length) {
        return (
            <div className={className}>
                <Text
                    size="l"
                    title={t('Статьи не найдены')}
                />
            </div>
        );
    }

    return (

        <HStack
            wrap="wrap"
            gap="16"
            data-testid="ArticleList"
        >
            <Virtuoso
                data={articles}
                useWindowScroll
                itemContent={(_, article) => renderArticle(article)}
                style={{ width: '100%' }}
            />
            {isLoading && getSkeletons()}
        </HStack>

    );
});
