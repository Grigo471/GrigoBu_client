import { memo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Page } from '@/widgets/Page';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { getUserAuthData } from '@/entities/User';
import { ArticleDetails, fetchArticleById } from '@/entities/Article';
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
    getArticleEditPageIsPreview,
} from '../../model/selectors/articleEditPageSelectors';
import { AddArticleBlockDropdown } from '../AddArticleBlockDropdown/AddArticleBlockDropdown';
import ArticleFilesProvider from '../ArticleFilesProvider/ArticleFilesProvider';

const reducers: ReducerList = {
    articleEditPage: articleEditPageReducers,
};

const ArticleEditPage = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { id } = useParams<{id:string}>();
    const isEdit = Boolean(id);
    const authData = useSelector(getUserAuthData);
    const formData = useSelector(getArticleEditPageForm);
    const isLoading = useSelector(getArticleEditPageIsLoading);
    const error = useSelector(getArticleEditPageError);
    const isPreview = useSelector(getArticleEditPageIsPreview);

    useDynamicModuleLoad({ reducers });

    useEffect(() => {
        if (isEdit) {
            dispatch(fetchArticleById(id));
        } else {
            dispatch(articleEditPageActions.clearState());
            if (authData) {
                dispatch(articleEditPageActions.setUser(authData));
            }
        }
    }, [isEdit, dispatch, authData, id]);

    const canEdit = !isEdit || formData?.user.username === authData?.username;

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
        <ArticleDetails article={formData} />
    ) : (
        <ArticleEditForm />
    );

    return (
        <ArticleFilesProvider>
            {isLoading ? <ArticleEditPageSkeletons />
                : (
                    <StickyContentLayout
                        content={(<Page>{content}</Page>)}
                        left={(<AddArticleBlockDropdown />)}
                        right={(<ArticleEditToolbar />)}
                    />
                ) }
        </ArticleFilesProvider>
    );
};

export default memo(ArticleEditPage);
