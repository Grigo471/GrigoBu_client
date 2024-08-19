import { memo } from 'react';
import { ArticleListItemProps } from './ArticleListItemProps/ArticleListItemProps';
import { ArticleListItemRedesigned } from './ArticleListItemRedesigned/ArticleListItemRedesigned';

export const ArticleListItem = memo((props: ArticleListItemProps) => (
    <ArticleListItemRedesigned {...props} />
));
