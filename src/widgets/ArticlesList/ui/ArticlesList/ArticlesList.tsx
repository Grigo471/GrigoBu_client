import React, {
    memo,
    useCallback,
    useRef,
    useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { ListRange, Virtuoso, VirtuosoHandle } from 'react-virtuoso';

import { useLocation } from 'react-router-dom';
import { Text } from '@/shared/ui/Text';
import { Article } from '@/entities/Article';
import { ArticleListItemSkeleton } from './ArticleListItemSkeleton';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import cls from './ArticlesList.module.scss';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect';
import { Icon } from '@/shared/ui/Icon';
import RefreshIcon from '@/shared/assets/icons/refresh.svg';

interface ArticlesListProps {
   articles?: Article[];
   isLoading?: boolean;
   page?: number;
   error?: string;
   onLoadNextPart?: () => void;
   setUncollapsed: (articleId: string) => void;
   refreshHandler: () => void;
}

type ScrollSchema = Record<string, number>;

export const scrollByPath: ScrollSchema = {};

export const ArticlesList = memo((props: ArticlesListProps) => {
    const {
        articles, isLoading, error, page, onLoadNextPart, setUncollapsed, refreshHandler,
    } = props;
    const { t } = useTranslation();
    const { pathname } = useLocation();
    const ref = useRef<VirtuosoHandle>();
    const [isScrolling, setIsScrolling] = useState(false);

    function setVirtuosoRef(el: VirtuosoHandle) {
        ref.current = el;
    }

    const renderArticle = (article: Article) => (
        <ArticleListItem
            article={article}
            key={article.id}
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
            <div className={cls.footer} />
        </>
    ));

    const rangeHandler = useCallback((range: ListRange) => {
        scrollByPath[pathname] = Math.floor((range.startIndex + range.endIndex) / 2);
    }, [pathname]);

    useInitialEffect(() => {
        const scrollPosition = scrollByPath[pathname];
        if (scrollPosition && scrollPosition > 0) {
            const virtuoso = ref.current;
            setIsScrolling(true);
            setTimeout(() => {
                setIsScrolling(false);
                virtuoso?.scrollToIndex({ index: scrollPosition, align: 'center' });
            }, 69);
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
            {/* {(isLoading && page === 1) && getSkeletons()} */}
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
                endReached={onLoadNextPart}
            />
        </>
    );
});
