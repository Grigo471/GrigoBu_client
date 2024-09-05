import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { VStack } from '@/shared/ui/Stack';
import cls from './ArticleDetails.module.scss';

import { renderArticleBlock } from './rednerArticleBlock';
import { Text } from '@/shared/ui/Text';
import { Article } from '../../model/types/article';

interface ArticleDetailsProps {
   className?: string;
   article?: Article;
}

export const ArticleDetails = memo((props: ArticleDetailsProps) => {
    const { className, article } = props;

    return (
        <VStack gap="24" className={classNames(cls.ArticleDetails, {}, [className])}>
            <Text
                title={article?.title}
                size="m"
                bold
            />
            {/* {article?.subtitle && (
                <Text
                    title={article?.subtitle}
                    size="s"
                />
            )} */}
            {article?.blocks.map(renderArticleBlock)}
        </VStack>
    );
});
