import React, {
    memo,
    useCallback,
    useEffect,
    useRef,
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

    const scrollerRef = useRef<HTMLElement | Window | null>(null);

    const handleScrollerRef = useCallback((ref: HTMLElement | Window | null) => {
        scrollerRef.current = ref;
    }, []);

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

    const Header = memo(() => (
        <div className={cls.header} />
    ));

    const pathname = useLocation();

    const scrollHandler = useThrottle(() => {
        sessionStorage.setItem(`${pathname.pathname} scrollPosition`, window.scrollY.toString());
    }, 100);

    useEffect(() => {
        const scrollPosition = Number(sessionStorage.getItem(`${pathname.pathname} scrollPosition`)) || 0;
        window.addEventListener('scroll', scrollHandler);
        console.log(scrollPosition);
        setTimeout(() => window.scrollTo({ top: scrollPosition, behavior: 'smooth' }), 100);

        return () => {
            window.removeEventListener('scroll', scrollHandler);
        };
    }, []);

    // useEffect(() => {
    //     setTimeout(() => {
    //         if (
    //             scrollerRef.current
    //         && scrollerRef.current instanceof HTMLElement
    //         ) scrollerRef.current.scrollTo({ top: 500, behavior: 'smooth' });
    //     }, 10);
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
            // scrollerRef={handleScrollerRef}
            useWindowScroll
            components={{ Footer, Header }}
            itemContent={(_, article) => renderArticle(article)}
            style={{ width: '100%', height: '100%' }}
            endReached={onLoadNextPart}
        />
    );
});
