import { memo, HTMLAttributeAnchorTarget } from 'react';
import { useTranslation } from 'react-i18next';
import { Virtuoso } from 'react-virtuoso';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleList.module.scss';
import { Article } from '../../model/types/article';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';
import { ArticleView } from '../../model/consts/consts';
import { HStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

interface ArticleListProps {
   className?: string;
   articles: Article[];
   isLoading?: boolean;
   view?: ArticleView;
   target?: HTMLAttributeAnchorTarget;
}

export const ArticleList = memo((props: ArticleListProps) => {
    const {
        className,
        articles,
        isLoading,
        view = ArticleView.SMALL,
        target,
    } = props;
    const { t } = useTranslation('article');

    const renderArticle = (article: Article) => (
        <ArticleListItem
            article={article}
            view={view}
            key={article.id}
            className={cls.card}
            target={target}
        />
    );

    const getSkeletons = (view: ArticleView) => new Array(view === ArticleView.SMALL ? 9 : 3)
        .fill(0)
        .map((item, index) => (
            <ArticleListItemSkeleton className={cls.card} key={index} view={view} />
        ));

    if (!isLoading && !articles.length) {
        return (
            <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
                <Text
                    size="l"
                    title={t('Статьи не найдены')}
                />
            </div>
        );
    }

    return (

        <HStack
            wrap="wrap"
            gap="16"
            data-testid="ArticleList"
            className={classNames(cls.ArticleListRedesigned, {}, [])}
        >
            {view === ArticleView.BIG ? (
                <Virtuoso
                    data={articles}
                    useWindowScroll
                    itemContent={(_, article) => renderArticle(article)}
                    style={{ width: '100%' }}
                />
            ) : (
                articles.map(renderArticle)
            // <VirtuosoGrid
            //     style={{ width: '100%' }}
            //     totalCount={articles.length}
            //     useWindowScroll
            //     listClassName={cls.SMALL}
            //     itemContent={(index) => renderArticle(articles[index])}
            // />
            )}
            {isLoading && getSkeletons(view)}
        </HStack>

    );
});
