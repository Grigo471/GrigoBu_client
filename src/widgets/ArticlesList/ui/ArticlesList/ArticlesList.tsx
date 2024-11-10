import React, {
    memo,
} from 'react';
import { useTranslation } from 'react-i18next';
import { Virtuoso } from 'react-virtuoso';

import { useLocation } from 'react-router-dom';
import { Text } from '@/shared/ui/Text';
import { Article } from '@/entities/Article';
import { ArticleListItemSkeleton } from './ArticleListItemSkeleton';
import { VStack } from '@/shared/ui/Stack';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import cls from './ArticlesList.module.scss';
import { useThrottle } from '@/shared/lib/hooks/useThrottle';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect';

interface ArticlesListProps {
   articles?: Article[];
   isLoading?: boolean;
   uncollapsedCards: string[];
   setUncollapsed: (articleId: string) => void;
   page?: number;
   error?: string;
   onLoadNextPart?: () => void;
}

export const scrollByPath: Record<string, number> = {};

export const ArticlesList = memo((props: ArticlesListProps) => {
    const {
        articles, isLoading, error, page, onLoadNextPart, uncollapsedCards, setUncollapsed,
    } = props;
    const { t } = useTranslation();

    const renderArticle = (article: Article) => (
        <ArticleListItem
            article={article}
            uncollapsed={uncollapsedCards.includes(article.id)}
            setUncollapsed={setUncollapsed}
            key={article.id}
        />
    );

    const getSkeletons = () => new Array(3)
        .fill(0)
        .map((item, index) => (
            <ArticleListItemSkeleton key={index} />
        ));

    const Footer = memo(() => (
        <>
            {isLoading && getSkeletons()}
            <div className={cls.footer} />
        </>
    ));

    const Header = memo(() => (
        <div className={cls.header} />
    ));

    const { pathname } = useLocation();

    const scrollHandler = useThrottle((e: React.UIEvent<HTMLDivElement>) => {
        scrollByPath[pathname] = e.currentTarget.scrollTop;
    }, 100);

    useInitialEffect(() => {
        const scrollPosition = scrollByPath[pathname];
        if (scrollPosition && scrollPosition > 0) {
            const virtuoso = document.getElementById(`virtuoso ${pathname}`);
            setTimeout(() => {
                virtuoso?.scrollTo({ top: scrollPosition, behavior: 'smooth' });
            }, 100);
        }
    });

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

    if (isLoading && page === 1) {
        return (
            <>
                {getSkeletons()}
            </>
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
        <Virtuoso
            id={`virtuoso ${pathname}`}
            data={articles}
            onScroll={scrollHandler}
            components={{ Footer, Header }}
            itemContent={(_, article) => renderArticle(article)}
            style={{ width: '100%', height: '100%' }}
            endReached={onLoadNextPart}
        />
    );
});
