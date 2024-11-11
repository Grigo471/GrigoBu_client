import {
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
import { VStack } from '@/shared/ui/Stack';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import cls from './ArticlesList.module.scss';
import { Icon } from '@/shared/ui/Icon';
import RefreshIcon from '@/shared/assets/icons/refresh.svg';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect';

interface ArticlesListProps {
   articles?: Article[];
   isLoading?: boolean;
   setUncollapsed: (articleId: string) => void;
   refreshHandler?: () => void;
   page?: number;
   error?: string;
   onLoadNextPart?: () => void;
}

export const scrollByPath: Record<string, number> = {};

export const ArticlesList = memo((props: ArticlesListProps) => {
    const {
        articles, isLoading, error, page, refreshHandler,
        onLoadNextPart, setUncollapsed,
    } = props;
    const { t } = useTranslation();

    const [isScrolling, setIsScrolling] = useState(false);

    const ref = useRef<VirtuosoHandle>();

    function setVirtuosoRef(el: VirtuosoHandle) {
        ref.current = el;
    }

    const renderArticle = (article: Article) => (
        <ArticleListItem
            article={article}
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

    const { pathname } = useLocation();

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
        <>
            <Icon onClick={refreshHandler} clickable Svg={RefreshIcon} className={cls.reload} />
            <Virtuoso
                id={`virtuoso ${pathname}`}
                ref={setVirtuosoRef}
                rangeChanged={rangeHandler}
                data={articles}
                components={{ Footer }}
                itemContent={(_, article) => renderArticle(article)}
                style={{ width: '100%', height: '100%', opacity: isScrolling ? '0' : '1' }}
                endReached={onLoadNextPart}
            />
        </>
    );
});
