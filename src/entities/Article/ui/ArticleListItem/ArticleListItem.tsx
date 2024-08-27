import { HTMLAttributeAnchorTarget, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleListItem.module.scss';
import { Icon } from '@/shared/ui/Icon';
import { Text } from '@/shared/ui/Text';
import EyeIcon from '@/shared/assets/icons/eye.svg';
import { Card } from '@/shared/ui/Card';
import { Avatar } from '@/shared/ui/Avatar';
import { AppImage } from '@/shared/ui/AppImage';
import { Skeleton } from '@/shared/ui/Skeleton';

import { getRouteArticleDetails } from '@/shared/const/router';
import { Button } from '@/shared/ui/Button';
import { AppLink } from '@/shared/ui/AppLink';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Article, ArticleTextBlock } from '../../model/types/article';
import { ArticleBlockType } from '../../model/consts/consts';

export interface ArticleListItemProps {
    className?: string;
    article: Article;
    target?: HTMLAttributeAnchorTarget;
}

export const ArticleListItem = memo((props: ArticleListItemProps) => {
    const {
        className, article, target,
    } = props;
    const { t } = useTranslation('article');

    const createdAt = <Text text={article.createdAt} className={cls.date} />;
    const views = (
        <HStack gap="8">
            <Icon Svg={EyeIcon} />
            <Text text={String(article.views)} className={cls.views} />
        </HStack>
    );

    const textBlock = article.blocks.find(
        (block) => block.type === ArticleBlockType.TEXT,
    ) as ArticleTextBlock;

    return (
        <div className={classNames(cls.ArticleListItem, {}, [className])}>
            <Card
                max
                padding="24"
                data-testid="ArticleListItem"
            >
                <VStack max gap="16">
                    <HStack gap="8">
                        <Avatar className={cls.avatar} size={32} src={article.user.avatar} />
                        <Text bold text={article.user.username} />
                        {createdAt}
                    </HStack>
                    <Text title={article.title} bold className={cls.title} />
                    <Text title={article.subtitle} size="s" />
                    <AppImage
                        src={article.img}
                        alt={article.title}
                        className={cls.img}
                        fallback={<Skeleton width="100%" height={250} />}
                    />
                    {textBlock?.paragraphs && (
                        <Text
                            className={cls.textBlock}
                            text={textBlock.paragraphs}
                            whiteSpace="preWrap"
                        />
                    )}
                    <HStack max justify="between">
                        <AppLink target={target} to={getRouteArticleDetails(article.id)}>
                            <Button
                                variant="outline"
                            >
                                {t('Читать далее')}
                            </Button>
                        </AppLink>
                        {views}
                    </HStack>
                </VStack>
            </Card>
        </div>
    );
});
