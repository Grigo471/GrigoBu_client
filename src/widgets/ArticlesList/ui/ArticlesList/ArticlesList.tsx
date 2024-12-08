import {
    memo,
    useLayoutEffect,
} from 'react';
import { useTranslation } from 'react-i18next';
import { Virtuoso } from 'react-virtuoso';

import { useLocation, useParams } from 'react-router-dom';
import { Text } from '@/shared/ui/Text';
import { Article, useArticlesListPageActions } from '@/entities/Article';
import { ArticleListItemSkeleton } from './ArticleListItemSkeleton';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import cls from './ArticlesList.module.scss';
import { Icon } from '@/shared/ui/Icon';
import RefreshIcon from '@/shared/assets/icons/refresh.svg';
import { ARTICLES_PAGE_LIMIT } from '@/shared/const/articlesApi';
import { scrollByPath } from '@/shared/lib/router/scrollByPath';

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
        scrollByPath[pathname] = window.scrollY;
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
            {/** used to be version 2.4.1 */ }
            <Virtuoso
                increaseViewportBy={{ top: 2000, bottom: 2000 }}
                overscan={{ main: 2000, reverse: 2000 }}
                data={articles}
                useWindowScroll
                initialScrollTop={scrollByPath[pathname] || 0}
                components={{ Footer }}
                itemContent={(_, article) => renderArticle(article)}
                endReached={endReached}
            />
        </>
    );
});
