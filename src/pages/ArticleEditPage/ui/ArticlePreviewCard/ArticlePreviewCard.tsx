import {
    memo,
} from 'react';
import {
    Article, ArticleDetails, ArticleTagsRow,
} from '@/entities/Article';
import cls from './ArticlePreviewCard.module.scss';
import { VStack } from '@/shared/ui/Stack';
import { Card } from '@/shared/ui/Card';

interface ArticlePreviewCardProps {
    article?: Article;
}

export const ArticlePreviewCard = memo((props: ArticlePreviewCardProps) => {
    const { article } = props;

    if (!article) return null;

    return (
        <Card border="minimum" padding="24" className={cls.card}>
            <VStack gap="8">
                <ArticleDetails
                    article={article}
                    type="preview"
                />
                <ArticleTagsRow tags={article.tags} />
            </VStack>
        </Card>
    );
});
