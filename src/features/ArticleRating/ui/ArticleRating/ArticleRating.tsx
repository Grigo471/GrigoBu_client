import { type PropsWithChildren, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RatingCard } from '@/entities/Rating';
import { useGetArticleRating, useRateArticle } from '../../api/articleRatingApi';
import { getUserAuthData } from '@/entities/User';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton';

export interface ArticleRatingProps {
   className?: string;
   articleId: string;
}

const ArticleRating = memo((props: PropsWithChildren<ArticleRatingProps>) => {
    const { className, articleId } = props;
    const { t } = useTranslation();

    const userData = useSelector(getUserAuthData);

    const { data, isLoading } = useGetArticleRating({
        userId: userData?.id ?? '',
        articleId,
    });

    const rating = data?.[0];

    const [rateArticleMutation] = useRateArticle();

    const handleRateArticle = useCallback((starCount: number, feedback?: string) => {
        try {
            rateArticleMutation({
                userId: userData?.id ?? '',
                articleId,
                rate: starCount,
                feedback,
            });
        } catch (error) {
            console.log(error);
        }
    }, [articleId, rateArticleMutation, userData?.id]);

    const onAccept = useCallback((starCount: number, feedback?: string) => {
        handleRateArticle(starCount, feedback);
    }, [handleRateArticle]);

    const onCancel = useCallback((starCount: number) => {
        handleRateArticle(starCount);
    }, [handleRateArticle]);

    if (isLoading) return <Skeleton width="100%" height={120} />;

    return (
        <RatingCard
            onAccept={onAccept}
            onCancel={onCancel}
            rate={rating?.rate}
            className={className}
            title={t('Оцените статью')}
            feedbackTitle={t('Оцените статью, это поможет улучшить качество')}
            hasFeedback
        />
    );
});

export default ArticleRating;
