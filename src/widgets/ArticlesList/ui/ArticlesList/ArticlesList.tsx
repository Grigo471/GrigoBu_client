import {
    memo,
    useLayoutEffect,
    useRef,
} from 'react';
import { useTranslation } from 'react-i18next';
import { Virtuoso, VirtuosoHandle } from 'react-virtuoso';

import { useLocation, useParams } from 'react-router-dom';
import { Text } from '@/shared/ui/Text';
import { Article, useArticlesListPageActions } from '@/entities/Article';
import { ArticleListItemSkeleton } from './ArticleListItemSkeleton';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import cls from './ArticlesList.module.scss';
import { Icon } from '@/shared/ui/Icon';
import RefreshIcon from '@/shared/assets/icons/refresh.svg';
import { ARTICLES_PAGE_LIMIT } from '@/shared/const/articlesApi';
import {
    getVirtuosoStateByPathname, setVirtuosoStateByPathname,
} from '@/shared/lib/virtuosoState/virtuosoStateByPathname';

interface ArticlesListProps {
   articles?: Article[];
   isLoading?: boolean;
   page: number;
   error?: string;
   setUncollapsed: (articleId: string) => void;
   refreshHandler: () => void;
}

export const ArticlesList = memo((props: ArticlesListProps) => {
    const {
        articles, isLoading, error, page, setUncollapsed, refreshHandler,
    } = props;
    const { t } = useTranslation();

    const { pathname } = useLocation();
    const { username } = useParams();
    const { setPage } = useArticlesListPageActions();

    const ref = useRef<VirtuosoHandle>();
    function setVirtuosoRef(el: VirtuosoHandle) {
        ref.current = el;
    }

    const virtuosoState = getVirtuosoStateByPathname(pathname);
    const scrollTop = (virtuosoState?.scrollTop && virtuosoState?.scrollTop > 500)
        ? undefined
        : virtuosoState?.scrollTop;

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
            <div />
        </>
    ));

    const endReached = () => {
        if (articles) {
            const currPage = Math.ceil(articles.length / ARTICLES_PAGE_LIMIT);
            if (articles.length === currPage * ARTICLES_PAGE_LIMIT) {
                setPage(pathname, currPage + 1);
            }
        }
    };

    useLayoutEffect(() => () => {
        ref.current?.getState((state) => { setVirtuosoStateByPathname(pathname, state); });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
            {/** used to be version 2.4.1 */ }
            <Virtuoso
                increaseViewportBy={{ top: 500, bottom: 500 }}
                overscan={{ main: 500, reverse: 500 }}
                data={articles}
                ref={setVirtuosoRef}
                useWindowScroll
                initialScrollTop={scrollTop}
                restoreStateFrom={
                    scrollTop ? undefined : virtuosoState
                }
                components={{ Footer }}
                itemContent={(_, article) => renderArticle(article)}
                endReached={endReached}
            />
        </>
    );
});
