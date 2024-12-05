import { memo, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { getUserAuthData } from '@/entities/User';
import { fetchArticleById } from '@/entities/Article';
import {
    articleEditPageActions, articleEditPageReducers,
} from '../../model/slice/ArticleEditPageSlice';

import { ReducerList, useDynamicModuleLoad } from '@/shared/lib/hooks/useDynamicModuleLoad';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import { Text } from '@/shared/ui/Text';
import { HStack } from '@/shared/ui/Stack';
import { ArticleEditPageSkeletons } from './ArticleEditPageSkeletons';
import { ArticleEditForm } from '../ArticleEditForm/ArticleEditForm';
import { ArticleEditToolbar } from '../ArticleEditToolbar/ArticleEditToolbar';
import {
    getArticleEditPageError,
    getArticleEditPageForm,
    getArticleEditPageIsLoading,
} from '../../model/selectors/articleEditPageSelectors';
import ArticleFilesProvider from '../ArticleFilesProvider/ArticleFilesProvider';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect';
import { ArticlePreviewCard } from '../ArticlePreviewCard/ArticlePreviewCard';

const reducers: ReducerList = {
    articleEditPage: articleEditPageReducers,
};

const ArticleEditPage = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { id } = useParams<{id:string}>();
    const isEdit = Boolean(id);

    const [isPreview, setIsPreview] = useState(false);
    const authData = useSelector(getUserAuthData);
    const formData = useSelector(getArticleEditPageForm);
    const isLoading = useSelector(getArticleEditPageIsLoading);
    const error = useSelector(getArticleEditPageError);

    useDynamicModuleLoad({ reducers, removeAfterUnmount: false });

    useEffect(() => {
        dispatch(articleEditPageActions.setIsEdit(isEdit));
    }, [isEdit, dispatch]);

    useInitialEffect(() => {
        if (isEdit) {
            dispatch(fetchArticleById(id));
        } else if (authData) {
            dispatch(articleEditPageActions.setUser(authData));
        }
    });

    const canEdit = !isEdit
    || formData?.user.username === authData?.username
    || authData?.role === 'admin';

    if (error) {
        return (
            <HStack justify="center" max>
                <Text
                    variant="error"
                    title={t('Произошла ошибка при загрузке статьи')}
                    text={t('Попробуйте обновить страницу')}
                    align="center"
                />
            </HStack>
        );
    }

    if (!canEdit) {
        return (
            <Text variant="error" title={t('Вы не можете редактировать данную статью')} />
        );
    }

    const content = isPreview ? (
        <ArticlePreviewCard article={formData} />
    ) : (
        <ArticleEditForm />
    );

    return (
        <ArticleFilesProvider>
            {isLoading ? <ArticleEditPageSkeletons />
                : (
                    <StickyContentLayout
                        content={(content)}
                        right={(
                            <ArticleEditToolbar
                                isPreview={isPreview}
                                setIsPreview={setIsPreview}
                            />
                        )}
                    />
                ) }
        </ArticleFilesProvider>
    );
};

export default memo(ArticleEditPage);
