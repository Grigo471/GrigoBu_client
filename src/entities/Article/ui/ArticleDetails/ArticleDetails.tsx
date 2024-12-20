/* eslint-disable react/no-unused-prop-types */
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { HStack } from '@/shared/ui/Stack';
import cls from './ArticleDetails.module.scss';

import { renderArticleBlock } from './rednerArticleBlock';
import { Text } from '@/shared/ui/Text';
import { Article } from '../../model/types/article';
import { Avatar } from '@/shared/ui/Avatar';
import { AppLink } from '@/shared/ui/AppLink';
import { srcWithApi } from '@/shared/lib/url/srcWithApi/srcWithApi';
import { classNames } from '@/shared/lib/classNames/classNames';
import { formatDateToLocal } from '@/shared/lib/helpers/date/formatDateToLocal';

interface ArticleDetailsProps {
    article?: Article;
    className?: string;
    type?: 'list' | 'details' | 'preview' | 'userList';
}

export const ArticleTagsRow = memo(({ tags }: { tags: string[] }) => (
    <HStack gap="16" wrap="wrap">
        {tags.map((tag) => (
            <Text
                className={cls.tag}
                key={tag}
                text={`#${tag}`}
            />
        ))}
    </HStack>
));

export const ArticleDetails = memo(
    React.forwardRef<HTMLDivElement, ArticleDetailsProps>((props, ref) => {
        const {
            article, type = 'list', className,
        } = props;

        const { i18n } = useTranslation();

        if (!article) return null;

        const avatar = article?.user.avatar;
        const date = formatDateToLocal(article?.createdAt, i18n.language);

        const title = (type === 'list' || type === 'userList') ? (
            <AppLink to={`/article/${article?.id}`}>
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

        const userInfo = (type === 'preview' || type === 'userList') ? (
            <HStack gap="8">
                <Avatar src={srcWithApi(avatar)} size={24} />
                <span className={cls.username}>{article?.user.username}</span>
            </HStack>
        ) : (
            <AppLink to={`/users/${article?.user.username}`}>
                <HStack gap="8">
                    <Avatar src={srcWithApi(avatar)} size={24} />
                    <span className={cls.username}>{article?.user.username}</span>
                </HStack>
            </AppLink>
        );

        return (
            <div ref={ref} className={classNames(cls.ArticleDetails, {}, [className])}>
                <HStack gap="8">
                    {userInfo}
                    <Text text={date} />
                </HStack>
                {title}
                {article?.blocks.map(renderArticleBlock)}
            </div>
        );
    }),
);
