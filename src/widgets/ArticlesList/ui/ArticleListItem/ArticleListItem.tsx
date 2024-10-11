import { memo, useState } from 'react';
import { Article, ArticleDetails } from '@/entities/Article';

interface ArticleListItemProps {
   article: Article;
}

export const ArticleListItem = memo((props: ArticleListItemProps) => {
    const { article } = props;

    const [isCollapsed, setIsCollapsed] = useState(true);

    return (
        <ArticleDetails article={article} />
    );
});
