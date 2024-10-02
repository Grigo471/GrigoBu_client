import { type PropsWithChildren, memo, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleRatingButton.module.scss';
import { VStack } from '@/shared/ui/Stack';
import ArrowIcon from '@/shared/assets/icons/arrow-bottom.svg';
import { Icon } from '@/shared/ui/Icon';
import { Button } from '@/shared/ui/Button';
import { Article } from '../../model/types/article';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { likeArticle } from '../../model/services/likeArticle/likeArticle';
import { dislikeArticle } from '../../model/services/dislikeArticle/dislikeArticle';

interface ArticleRatingButtonProps {
   className?: string;
   article: Article;
}

export const ArticleRatingButton = memo((props: PropsWithChildren<ArticleRatingButtonProps>) => {
    const { className, article } = props;

    const dispatch = useAppDispatch();

    const onLike = useCallback(() => {
        dispatch(likeArticle(article.id));
    }, [dispatch, article]);

    const onDislike = useCallback(() => {
        dispatch(dislikeArticle(article.id));
    }, [dispatch, article]);

    return (
        <VStack gap="8" className={classNames(cls.ArticleRatingButton, {}, [className])}>
            <Button
                square
                variant="filled"
                color={article.myRate === 1 ? 'success' : 'normal'}
                onClick={onLike}
            >
                <VStack align="center">
                    <Icon className={cls.up} Svg={ArrowIcon} />
                    {article.rating}
                </VStack>
            </Button>
            <Button
                square
                variant="filled"
                color={article.myRate === -1 ? 'error' : 'normal'}
                onClick={onDislike}
            >
                <Icon Svg={ArrowIcon} />
            </Button>
        </VStack>
    );
});
