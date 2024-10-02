import {
    type PropsWithChildren, ReactNode, memo, useCallback,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { Virtuoso } from 'react-virtuoso';
import { ArticleListType } from '../../model/types/ArticleListType';
import { articlesListReducer, getArticles } from '../../model/slice/articlesListSlice';
import {
    getArticlesListError,
    getArticlesListIsLoading,
} from '../../model/selectors/articlesListSelectors';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { ReducerList, useDynamicModuleLoad } from '@/shared/lib/hooks/useDynamicModuleLoad';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect';
import { initArticlesList } from '../../model/services/initArticlesList/initArticlesList';
import {
    fetchNextArticlesPage,
} from '../../model/services/fetchNextArticlesPage/fetchNextArticlePage';
import { Text } from '@/shared/ui/Text';
import { Article, ArticleDetails } from '@/entities/Article';
import { ArticleListItemSkeleton } from './ArticleListItemSkeleton';
import { VStack } from '@/shared/ui/Stack';

const reducers: ReducerList = {
    articlesList: articlesListReducer,
};

interface ArticlesListProps {
   className?: string;
   type?: ArticleListType;
   header?: ReactNode;
}

export const ArticlesList = memo((props: PropsWithChildren<ArticlesListProps>) => {
    const { className, type = 'all', header } = props;
    const { t } = useTranslation();

    const articles = useSelector(getArticles.selectAll);
    const error = useSelector(getArticlesListError);
    const isLoading = useSelector(getArticlesListIsLoading);

    const dispatch = useAppDispatch();

    useDynamicModuleLoad({ reducers, removeAfterUnmount: false });

    const [searchParams] = useSearchParams();

    useInitialEffect(() => {
        dispatch(initArticlesList(searchParams));
    });

    const onLoadNextPart = useCallback(() => {
        dispatch(fetchNextArticlesPage());
    }, [dispatch]);

    const renderArticle = (article: Article) => (
        <ArticleDetails
            article={article}
            key={article.id}
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
            {header}
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
