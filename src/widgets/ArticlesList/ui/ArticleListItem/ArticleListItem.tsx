import {
    memo, useCallback, useRef, useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import {
    Article, ArticleDetails, ArticleRatingButton,
} from '@/entities/Article';
import cls from './ArticleListItem.module.scss';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Card } from '@/shared/ui/Card';
import { AppLink } from '@/shared/ui/AppLink';
import { Icon } from '@/shared/ui/Icon';
import { Text } from '@/shared/ui/Text';
import CommentIcon from '@/shared/assets/icons/comment.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button } from '@/shared/ui/Button';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect';

interface ArticleListItemProps {
   article: Article;
   uncollapsed: boolean;
   setUncollapsed: (articleId: string) => void;
}

export const ArticleListItem = memo((props: ArticleListItemProps) => {
    const { article, uncollapsed, setUncollapsed } = props;
    const { t } = useTranslation();
    const [overflowActive, setOverflowActive] = useState(false);
    const detailsRef = useRef<HTMLDivElement>();

    function setDetailsRef(el: HTMLDivElement) {
        detailsRef.current = el;
    }

    const isOverflowActive = useCallback((
        el?: HTMLDivElement,
    ) => {
        if (el) return el.offsetHeight < el.scrollHeight || el.offsetWidth < el.scrollWidth;
    }, []);

    useInitialEffect(() => {
        if (isOverflowActive(detailsRef.current)) {
            setOverflowActive(true);
        }
    });

    return (
        <HStack gap="16" align="start" className={cls.ArticleListItem}>
            <ArticleRatingButton className={cls.rating} article={article} />
            <Card border="minimum" padding="24" className={cls.card}>
                <VStack gap="8">
                    <ArticleDetails
                        ref={setDetailsRef}
                        article={article}
                        withLinks
                        className={classNames('', { [cls.collapsed]: !uncollapsed }, [])}
                    />
                    {overflowActive && !uncollapsed
                    && (
                        <Button
                            onClick={() => setUncollapsed(article.id)}
                        >
                            {t('Показать больше')}
                        </Button>
                    )}
                    <AppLink to={`/article/${article?.id}`}>
                        <HStack gap="4">
                            <Icon className={cls.comment} Svg={CommentIcon} clickable />
                            <Text
                                variant="accent"
                                text={article?.commentsCount?.toString()}
                            />
                        </HStack>
                    </AppLink>
                </VStack>
            </Card>
        </HStack>
    );
});
