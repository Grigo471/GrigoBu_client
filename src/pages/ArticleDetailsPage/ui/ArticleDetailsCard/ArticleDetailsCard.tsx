import {
    memo,
} from 'react';
import {
    Article, ArticleDetails, ArticleRatingButton,
    ArticleTagsRow,
} from '@/entities/Article';
import cls from './ArticleDetailsCard.module.scss';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Card } from '@/shared/ui/Card';

interface ArticleDetailsCardProps {
    article?: Article;
}

export const ArticleDetailsCard = memo((props: ArticleDetailsCardProps) => {
    const { article } = props;

    if (!article) return null;

    return (
        <HStack gap="16" align="start" className={cls.ArticleDetailsCard}>
            <ArticleRatingButton className={cls.rating} article={article} />
            <Card border="minimum" padding="24" className={cls.card}>
                <VStack gap="8">
                    <ArticleDetails
                        article={article}
                        type="details"
                    />
                    <ArticleTagsRow tags={article.tags} />
                </VStack>
            </Card>
        </HStack>
    );
});
