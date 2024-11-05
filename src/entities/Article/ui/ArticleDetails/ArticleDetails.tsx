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

type ArticleDetailsView = 'list' | 'details' | 'preview';

interface ArticleDetailsProps {
   className?: string;
   article?: Article;
   view?: ArticleDetailsView;
}

export const ArticleDetails = memo((props: ArticleDetailsProps) => {
    const {
        className, article, view = 'list',
    } = props;

    if (!article) return null;

    const avatar = article?.user.avatar;
    const date = article?.createdAt.split('T')[0];

    const title = view === 'list' ? (
        <AppLink to={`/article/${article?.id}`} target="_blank">
            <Text
                title={article?.title}
                size="l"
                bold
            />
        </AppLink>
    ) : (
        <Text
            title={article?.title}
            size="l"
            bold
        />
    );

    return (
        <div className={classNames('', {}, [className, cls.ArticleDetails])}>
            <HStack gap="16" align="start">
                {
                    view !== 'preview'
                    && <ArticleRatingButton className={cls.rating} article={article} />
                }
                <Card max border="minimum" padding="24" className={cls.card}>
                    <VStack gap="8">
                        <HStack gap="8">
                            <AppLink to={`/users/${article?.user.username}`} target="_blank">
                                <HStack gap="8">
                                    <Avatar src={srcWithApi(avatar)} size={24} />
                                    <span className={cls.username}>{article?.user.username}</span>
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
                        {view === 'list' && (
                            <AppLink to={`/article/${article?.id}`} target="_blank">
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
