import {
    memo,
    useCallback,
    useLayoutEffect,
    useRef,
    useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { ListRange, Virtuoso, VirtuosoHandle } from 'react-virtuoso';

import { useLocation, useParams } from 'react-router-dom';
import { Text } from '@/shared/ui/Text';
import { Article } from '@/entities/Article';
import { ArticleListItemSkeleton } from './ArticleListItemSkeleton';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import cls from './ArticlesList.module.scss';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect';
import { Icon } from '@/shared/ui/Icon';
import RefreshIcon from '@/shared/assets/icons/refresh.svg';
import { ARTICLES_PAGE_LIMIT } from '@/shared/const/articlesApi';

interface ArticlesListProps {
   articles?: Article[];
   isLoading?: boolean;
   page: number;
   error?: string;
   onLoadNextPart: () => void;
   setUncollapsed: (articleId: string) => void;
   refreshHandler: () => void;
}

export const scrollByPath: Record<string, number> = {};
export const rangeByPath: Record<string, number> = {};

export const ArticlesList = memo((props: ArticlesListProps) => {
    const {
        articles, isLoading, error, page, onLoadNextPart, setUncollapsed, refreshHandler,
    } = props;
    const { t } = useTranslation();
    const { pathname } = useLocation();
    const { username } = useParams();
    const ref = useRef<VirtuosoHandle>();
    const [isScrolling, setIsScrolling] = useState(false);

    function setVirtuosoRef(el: VirtuosoHandle) {
        ref.current = el;
    }

    const renderArticle = (article: Article) => (
        <ArticleListItem
            article={article}
            key={article.id}
            type={username ? 'userList' : 'list'}
            setUncollapsed={setUncollapsed}
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
            {isScrolling && <div className={cls.scrollFallback} />}
        </>
    ));

    const endReached = () => {
        if (articles?.length && articles?.length === ARTICLES_PAGE_LIMIT * page) {
            onLoadNextPart();
        }
    };

    const rangeHandler = useCallback((range: ListRange) => {
        rangeByPath[pathname] = Math.floor((range.startIndex + range.endIndex) / 2);
    }, [pathname]);

    useLayoutEffect(() => () => {
        scrollByPath[pathname] = window.scrollY - 72;
    }, [pathname]);

    const scrollToRange = useCallback((rangePosition: number) => new Promise((resolve) => {
        setIsScrolling(true);
        setTimeout(() => {
            resolve(ref.current?.scrollToIndex({ index: rangePosition }));
        }, 69);
    }), []);

    const scrollToPosition = useCallback((scrollPosition: number) => new Promise((resolve) => {
        setTimeout(() => {
            resolve(ref.current?.scrollTo({ top: scrollPosition }));
        }, 69);
    }), []);

    useInitialEffect(() => {
        const scrollPosition = scrollByPath[pathname];
        const rangePosition = rangeByPath[pathname];
        if (rangePosition && rangePosition > 0) {
            scrollToRange(rangePosition).then(() => {
                scrollToPosition(scrollPosition).then(() => setIsScrolling(false));
            });
        }
    });

    if (isLoading && page === 1) {
        return (
            <>
                {getSkeletons()}
            </>

        );
    }

    return (
        <>
            <Icon
                className={cls.refresh}
                onClick={refreshHandler}
                clickable
                Svg={RefreshIcon}
            />
            {(!isLoading && !articles?.length) && (
                <Text
                    size="l"
                    title={t('Статьи не найдены')}
                />
            )}
            {(error) && (
                <Text
                    align="center"
                    variant="error"
                    title={t('Произошла ошибка при загрузке статьи')}
                />
            )}
            <Virtuoso
                increaseViewportBy={{ top: 0, bottom: 0 }}
                overscan={{ main: 0, reverse: 0 }}
                data={articles}
                ref={setVirtuosoRef}
                useWindowScroll
                initialTopMostItemIndex={0}
                rangeChanged={rangeHandler}
                components={{ Footer }}
                itemContent={(_, article) => renderArticle(article)}
                style={{
                    opacity: isScrolling ? '0' : '1',
                }}
                endReached={endReached}
            />
        </>
    );
});
