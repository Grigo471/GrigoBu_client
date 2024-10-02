import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { HStack, VStack } from '@/shared/ui/Stack';
import cls from './ArticleDetails.module.scss';

import { renderArticleBlock } from './rednerArticleBlock';
import { Text } from '@/shared/ui/Text';
import { Article } from '../../model/types/article';
import { Card } from '@/shared/ui/Card';
import { Avatar } from '@/shared/ui/Avatar';
import { ArticleRatingButton } from '../ArticleRatingButton/ArticleRatingButton';
import { AppLink } from '@/shared/ui/AppLink';
import { Icon } from '@/shared/ui/Icon';
import CommentIcon from '@/shared/assets/icons/comment.svg';
import { srcWithApi } from '@/shared/lib/url/srcWithApi/srcWithApi';

interface ArticleDetailsProps {
   className?: string;
   article?: Article;
   detailed?: boolean;
}

export const ArticleDetails = memo((props: ArticleDetailsProps) => {
    const { className, article, detailed = false } = props;

    if (!article) return null;

    const avatar = article?.user.avatar;
    const date = article?.createdAt.split('T')[0];

    const title = detailed ? (
        <Text
            title={article?.title}
            size="l"
            bold
        />
    ) : (
        <AppLink to={`/article/${article?.id}`}>
            <Text
                title={article?.title}
                size="l"
                bold
            />
        </AppLink>
    );

    return (
        <div className={classNames('', {}, [className, cls.ArticleDetails])}>
            <HStack gap="16" align="start">
                <ArticleRatingButton className={cls.rating} article={article} />
                <Card max border="minimum" padding="24">
                    <VStack gap="8">
                        <HStack gap="8">
                            <AppLink to={`/users/${article?.user.username}`}>
                                <HStack gap="8">
                                    <Avatar src={srcWithApi(avatar)} size={24} />
                                    <Text text={article?.user.username} bold />
                                </HStack>
                            </AppLink>
                            <Text text={date} />
                        </HStack>
                        {title}
                        {article?.blocks.map(renderArticleBlock)}
                        <HStack gap="16" wrap="wrap">
                            {article?.tags.map((tag) => (
                                <Text
                                    className={cls.tag}
                                    key={tag}
                                    text={`#${tag}`}
                                />
                            ))}
                        </HStack>
                        {!detailed && (
                            <AppLink to={`/article/${article?.id}`}>
                                <HStack gap="4">
                                    <Icon className={cls.comment} Svg={CommentIcon} clickable />
                                    <Text
                                        variant="accent"
                                        text={article?.commentsCount?.toString()}
                                    />
                                </HStack>
                            </AppLink>
                        ) }
                    </VStack>
                </Card>
            </HStack>
        </div>
    );
});
