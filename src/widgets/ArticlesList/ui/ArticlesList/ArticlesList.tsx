import React, {
    memo,
} from 'react';
import { useTranslation } from 'react-i18next';
import { ListRange, Virtuoso } from 'react-virtuoso';

import { useLocation } from 'react-router-dom';
import { Text } from '@/shared/ui/Text';
import { Article } from '@/entities/Article';
import { ArticleListItemSkeleton } from './ArticleListItemSkeleton';
import { VStack } from '@/shared/ui/Stack';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import cls from './ArticlesList.module.scss';

interface ArticlesListProps {
   articles?: Article[];
   isLoading?: boolean;
   error?: string;
   onLoadNextPart?: () => void;
}

type ScrollSchema = Record<string, number>;

const scrollByPath: ScrollSchema = {};

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

    const Footer = memo(() => (
        <>
            {isLoading && getSkeletons()}
            <div className={cls.footer} />
        </>
    ));

    const { pathname } = useLocation();

    const rangeChanged = (range: ListRange) => {
        scrollByPath[pathname] = range.startIndex;
        console.log(scrollByPath);
    };

    // const scrollHandler = useThrottle(() => {
    //     scrollByPath[pathname] = window.scrollY;
    //     console.log(scrollByPath, pathname);
    // }, 100);

    // useEffect(() => {
    //     const scrollPosition = scrollByPath[pathname] || 0;
    //     console.log(scrollByPath);
    //     window.addEventListener('scroll', scrollHandler);
    //     setTimeout(() => window.scrollTo({ top: scrollPosition }), 100);

    //     return () => {
    //         window.removeEventListener('scroll', scrollHandler);
    //     };
    // }, []);

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
        <Virtuoso
            data={articles}
            useWindowScroll
            components={{ Footer }}
            itemContent={(_, article) => renderArticle(article)}
            style={{ width: '100%', height: '100%' }}
            endReached={onLoadNextPart}
        />
    );
});
