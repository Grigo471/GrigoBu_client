import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ArticleDetails } from '@/entities/Article';
import { ReducerList, useDynamicModuleLoad } from '@/shared/lib/hooks/useDynamicModuleLoad';
import { Page } from '@/widgets/Page';
import { VStack } from '@/shared/ui/Stack';
import { ArticleRecommendationsList } from '@/features/ArticleRecommendationsList';
import { articleDetailsPageReducer } from '../../model/slice';
import cls from './ArticleDetailsPage.module.scss';
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader';
import { ArticleDetailsComments } from '../AricleDetailsComments/ArticleDetailsComments';
import { ArticleRating } from '@/features/ArticleRating';
import { ToggleFeatures } from '@/shared/lib/features';
import { Card } from '@/shared/ui/deprecated/Card';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import { DetailsContainer } from '../DetailsContainer/DetailsContainer';
import { AdditionalInfoContainer } from '../AdditionalInfoContainer/AdditionalInfoContainer';

interface ArticleDetailsPageProps {
   className?: string;
}

const reducers: ReducerList = {
    articleDetailsPage: articleDetailsPageReducer,
};

const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
    const { className } = props;
    const { t } = useTranslation('article');
    const { id } = useParams< string >();

    useDynamicModuleLoad({ reducers });

    if (!id) {
        return (
            <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
                {t('Статья не найдена')}
            </Page>
        );
    }

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={(
                <StickyContentLayout
                    content={(
                        <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
                            <VStack gap="16" max>
                                <DetailsContainer />
                                <ArticleRating articleId={id} />
                                <ArticleRecommendationsList />
                                <ArticleDetailsComments id={id} />
                            </VStack>
                        </Page>
                    )}
                    right={<AdditionalInfoContainer />}
                />

            )}
            off={(
                <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
                    <VStack gap="16" max>
                        <ArticleDetailsPageHeader />
                        <ArticleDetails articleId={id} />
                        <ToggleFeatures
                            feature="isArticleRatingEnabled"
                            on={(<ArticleRating articleId={id} />)}
                            off={<Card>{t('Рейнтиг скоро появится!')}</Card>}
                        />
                        <ArticleRecommendationsList />
                        <ArticleDetailsComments id={id} />
                    </VStack>
                </Page>
            )}
        />
    );
};

export default memo(ArticleDetailsPage);
