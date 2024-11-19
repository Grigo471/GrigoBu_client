import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ReducerList, useDynamicModuleLoad } from '@/shared/lib/hooks/useDynamicModuleLoad';
import { Page } from '@/widgets/Page';
import { VStack } from '@/shared/ui/Stack';
import { articleDetailsPageReducer } from '../../model/slice';
import cls from './ArticleDetailsPage.module.scss';
import { ArticleDetailsComments } from '../AricleDetailsComments/ArticleDetailsComments';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import { AdditionalInfoContainer } from '../AdditionalInfoContainer/AdditionalInfoContainer';
import { fetchArticleById } from '@/entities/Article';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect';
import { getArticleDetailsData } from '../../model/selectors/articleSelector';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { ArticleDetailsCard } from '../ArticleDetailsCard/ArticleDetailsCard';

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
    const dispatch = useAppDispatch();

    useDynamicModuleLoad({ reducers });

    useInitialEffect(() => {
        dispatch(fetchArticleById(id));
    });

    const article = useSelector(getArticleDetailsData);

    if (!id) {
        return (
            <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
                {t('Статья не найдена')}
            </Page>
        );
    }

    return (

        <StickyContentLayout
            content={(
                <VStack gap="16" max>
                    <ArticleDetailsCard article={article} />
                    <ArticleDetailsComments id={id} className={cls.comments} />
                </VStack>
            )}
            right={<AdditionalInfoContainer />}
        />

    );
};

export default memo(ArticleDetailsPage);
