import { memo, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleRatingButton.module.scss';
import ArrowIcon from '@/shared/assets/icons/arrow-bottom.svg';
import { Icon } from '@/shared/ui/Icon';
import { Button } from '@/shared/ui/Button';
import { Article, useRateArticle } from '@/entities/Article';

interface ArticleRatingButtonProps {
   className?: string;
   article: Article;
}

export const ArticleRatingButton = memo((props: ArticleRatingButtonProps) => {
    const { className, article } = props;

    const [rateArticle, { isLoading: isRateLoading }] = useRateArticle();

    const onLike = useCallback(async () => {
        await rateArticle({ articleId: article.id, rate: 'like' });
    }, [rateArticle, article.id]);

    const onDislike = useCallback(async () => {
        await rateArticle({ articleId: article.id, rate: 'dislike' });
    }, [rateArticle, article.id]);

    return (
        <div className={classNames(cls.ArticleRatingButton, {}, [className])}>
            <Button
                square
                variant="filled"
                color={article.myRate === 1 ? 'success' : 'normal'}
                onClick={onLike}
                disabled={isRateLoading}
                className={cls.btn}
            >
                <div className={cls.upBtn}>
                    <Icon className={cls.up} Svg={ArrowIcon} />
                    {article.rating}
                </div>
            </Button>
            <Button
                square
                variant="filled"
                color={article.myRate === -1 ? 'error' : 'normal'}
                onClick={onDislike}
                disabled={isRateLoading}
                className={cls.btn}
            >
                <Icon Svg={ArrowIcon} />
            </Button>
        </div>
    );
});
