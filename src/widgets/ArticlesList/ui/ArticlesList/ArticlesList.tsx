import {
    memo,
} from 'react';
import { useTranslation } from 'react-i18next';
import { Virtuoso } from 'react-virtuoso';

import { Text } from '@/shared/ui/Text';
import { Article } from '@/entities/Article';
import { ArticleListItemSkeleton } from './ArticleListItemSkeleton';
import { VStack } from '@/shared/ui/Stack';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';

interface ArticlesListProps {
   articles?: Article[];
   isLoading?: boolean;
   error?: string;
   onLoadNextPart?: () => void;
}

export const ArticlesList = memo((props: ArticlesListProps) => {
    const {
        articles, isLoading, error, onLoadNextPart,
    } = props;
    const { t } = useTranslation();

    const renderArticle = (article: Article) => (
        <ArticleListItem
            article={article}
            key={article.id}
        />
    );

    const getSkeletons = () => new Array(3)
        .fill(0)
        .map((item, index) => (
            <ArticleListItemSkeleton key={index} />
        ));

    if (!isLoading && !articles?.length) {
        return (
            <VStack gap="20">
                <Text
                    size="l"
                    title={t('Статьи не найдены')}
                />
            </VStack>
        );
    }

    if (error) {
        return (
            <Text
                align="center"
                variant="error"
                title={t('Произошла ошибка при загрузке статьи')}
            />
        );
    }

    return (
        <VStack gap="20">
            <Virtuoso
                data={articles}
                useWindowScroll
                itemContent={(_, article) => renderArticle(article)}
                style={{ width: '100%' }}
                endReached={onLoadNextPart}
            />
            {isLoading && getSkeletons()}
        </VStack>
    );
});
