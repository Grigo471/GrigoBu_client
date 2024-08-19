import {
    useEffect, memo,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ReducerList, useDynamicModuleLoad } from '@/shared/lib/hooks/useDynamicModuleLoad';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { Skeleton } from '@/shared/ui/Skeleton';
import { VStack } from '@/shared/ui/Stack';
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById';
import { articleDetailsReducers } from '../../model/slice/articleDetailsSlice';
import cls from './ArticleDetails.module.scss';
import {
    getArticleDetailsData,
    getArticleDetailsError,
    getArticleDetailsIsLoading,
} from '../../model/selectors/articleDetailsSelectors';

import { renderArticleBlock } from './rednerArticleBlock';
import { Text } from '@/shared/ui/Text';
import { AppImage } from '@/shared/ui/AppImage';

interface ArticleDetailsProps {
   className?: string;
   articleId?: string;
}

export const ArticleDetails = memo((props: ArticleDetailsProps) => {
    const { className, articleId } = props;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    const isLoading = useSelector(getArticleDetailsIsLoading);
    const error = useSelector(getArticleDetailsError);
    const article = useSelector(getArticleDetailsData);

    const reducers: ReducerList = {
        articleDetails: articleDetailsReducers,
    };

    useEffect(() => {
        if (__PROJECT__ !== 'storybook') {
            dispatch(fetchArticleById(articleId));
        }
    }, [dispatch, articleId]);

    useDynamicModuleLoad({ reducers });

    let content;

    if (isLoading) {
        content = (
            <VStack gap="16" max>
                <Skeleton className={cls.avatar} width={200} height={200} border="50%" />
                <Skeleton className={cls.title} width={300} height={32} />
                <Skeleton className={cls.skeleton} width={600} height={24} />
                <Skeleton className={cls.skeleton} width="100%" height={200} />
                <Skeleton className={cls.skeleton} width="100%" height={200} />
            </VStack>
        );
    } else if (error) {
        content = (
            <Text
                align="center"
                variant="error"
                title={t('Произошла ошибка при загрузке статьи')}
            />
        );
    } else {
        content = (
            <>
                <Text
                    title={article?.title}
                    size="l"
                    bold
                />
                <Text
                    title={article?.subtitle}
                />
                <AppImage
                    className={cls.img}
                    src={article?.img}
                    fallback={(
                        <Skeleton
                            width="100%"
                            height={420}
                            border="16"
                        />
                    )}
                />
                {article?.blocks.map(renderArticleBlock)}
            </>
        );
    }

    return (
        <VStack gap="16" className={classNames(cls.ArticleDetails, {}, [className])}>
            { content }
        </VStack>
    );
});
