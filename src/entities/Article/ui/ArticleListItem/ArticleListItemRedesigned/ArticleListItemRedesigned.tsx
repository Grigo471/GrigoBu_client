import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleListItemRedesigned.module.scss';
import { ArticleListItemProps } from '../ArticleListItemProps/ArticleListItemProps';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Text } from '@/shared/ui/redesigned/Text';
import EyeIcon from '@/shared/assets/icons/eye.svg';
import { ArticleBlockType, ArticleView } from '../../../model/consts/consts';
import { Card } from '@/shared/ui/redesigned/Card';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { AppImage } from '@/shared/ui/AppImage';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';

import { getRouteArticleDetails } from '@/shared/const/router';
import { Button } from '@/shared/ui/redesigned/Button';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { ArticleTextBlock } from '../../../model/types/article';
import { HStack, VStack } from '@/shared/ui/Stack';

export const ArticleListItemRedesigned = memo((props: ArticleListItemProps) => {
    const {
        className, article, view, target,
    } = props;
    const { t } = useTranslation('article');

    const createdAt = <Text text={article.createdAt} className={cls.date} />;
    const views = (
        <HStack gap="8">
            <Icon Svg={EyeIcon} />
            <Text text={String(article.views)} className={cls.views} />
        </HStack>
    );

    if (view === ArticleView.BIG) {
        const textBlock = article.blocks.find(
            (block) => block.type === ArticleBlockType.TEXT,
        ) as ArticleTextBlock;

        return (
            <div className={classNames(cls.ArticleListItemRedesigned, {}, [className])}>
                <Card
                    max
                    padding="24"
                    data-testid="ArticleListItem"
                    className={classNames('', {}, [cls[view]])}
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
    }

    return (
        <AppLink
            data-testid="ArticleListItem"
            target={target}
            to={getRouteArticleDetails(article.id)}
            className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
        >
            <Card className={cls.card} border="round" padding="0">
                <AppImage
                    src={article.img}
                    alt={article.title}
                    className={cls.img}
                    fallback={<Skeleton width="100%" height={200} />}
                />
                <VStack className={cls.info} gap="4">
                    <Text title={article.title} className={cls.title} />
                    <VStack gap="4" className={cls.footer} max>
                        <HStack justify="between" max>
                            {createdAt}
                            {views}
                        </HStack>
                        <HStack gap="4">
                            <Avatar className={cls.avatar} size={32} src={article.user.avatar} />
                            <Text bold text={article.user.username} />
                        </HStack>
                    </VStack>
                </VStack>
            </Card>
        </AppLink>
    );
});
