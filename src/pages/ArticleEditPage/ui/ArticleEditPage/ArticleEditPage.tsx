import { memo, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Page } from '@/widgets/Page';
import { ArticleEditForm } from '@/widgets/ArticleEditForm';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { getUserAuthData } from '@/entities/User';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect';
import { ArticleType, fetchArticleById, renderArticleBlock } from '@/entities/Article';
import {
    articleEditPageActions, articleEditPageReducers,
} from '../../model/slice/ArticleEditPageSlice';
import {
    getArticleEditPageError,
    getArticleEditPageForm,
    getArticleEditPageIsLoading,
    getArticleEditPageIsPreview,
    getArticleEditPageValidateErrors,
} from '../../model/selectors/articleEditPageSelectors';
import { ReducerList, useDynamicModuleLoad } from '@/shared/lib/hooks/useDynamicModuleLoad';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import { AddArticleBlockDropdown } from '@/features/AddArticleBlockDropdown';
import { Text } from '@/shared/ui/redesigned/Text';
import { AppImage } from '@/shared/ui/AppImage';
import cls from './ArticleEditPage.module.scss';
import { Card } from '@/shared/ui/redesigned/Card';
import { Button } from '@/shared/ui/redesigned/Button';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { ValidateArticleError } from '../../model/consts/consts';
import { saveArticle } from '../../model/services/saveArticle/saveArticle';

interface ArticleEditPageProps {
   className?: string;
}

const reducers: ReducerList = {
    articleEditPage: articleEditPageReducers,
};

const ArticleEditPage = (props: ArticleEditPageProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const { id } = useParams<{id:string}>();

    const isEdit = Boolean(id);
    const title = isEdit ? t('Редактирование статьи') : t('Создание новой статьи');
    const dispatch = useAppDispatch();
    const authData = useSelector(getUserAuthData);

    useDynamicModuleLoad({ reducers });

    useInitialEffect(() => {
        if (isEdit) {
            dispatch(fetchArticleById(id));
        } else if (authData) {
            dispatch(articleEditPageActions.setUser(authData));
        }
    });

    const formData = useSelector(getArticleEditPageForm);
    const isLoading = useSelector(getArticleEditPageIsLoading);
    const error = useSelector(getArticleEditPageError);
    const isPreview = useSelector(getArticleEditPageIsPreview);
    const validateErrors = useSelector(getArticleEditPageValidateErrors);

    const canEdit = !isEdit || formData?.user.id === authData?.id;

    const onChangeTitle = useCallback((value?: string) => {
        dispatch(articleEditPageActions.updateArticleTitle(value ?? ''));
    }, [dispatch]);

    const onChangeSubtitle = useCallback((value?: string) => {
        dispatch(articleEditPageActions.updateArticleSubtitle(value ?? ''));
    }, [dispatch]);

    const onChangeImage = useCallback((value?: string) => {
        dispatch(articleEditPageActions.updateArticleImage(value ?? ''));
    }, [dispatch]);

    const onChangeType = useCallback((value?: ArticleType) => {
        dispatch(articleEditPageActions.updateArticleType(value || ArticleType.IT));
    }, [dispatch]);

    const onChangeBlockTitle = useCallback((title: string, index: number) => {
        dispatch(articleEditPageActions.updateArticleBlockTitle(title, index));
    }, [dispatch]);

    const onChangeBlockSrc = useCallback((src: string, index: number) => {
        dispatch(articleEditPageActions.updateArticleBlockImage(src, index));
    }, [dispatch]);

    const onChangeBlockText = useCallback((text: string, index: number) => {
        dispatch(articleEditPageActions.updateArticleBlockText(text, index));
    }, [dispatch]);

    const onChangeBlockCode = useCallback((code: string, index: number) => {
        dispatch(articleEditPageActions.updateArticleBlockCode(code, index));
    }, [dispatch]);

    const onAddArticleTextBlock = useCallback(() => {
        dispatch(articleEditPageActions.addArticleTextBlock());
    }, [dispatch]);

    const onAddArticleImageBlock = useCallback(() => {
        dispatch(articleEditPageActions.addArticleImageBlock());
    }, [dispatch]);

    const onAddArticleCodeBlock = useCallback(() => {
        dispatch(articleEditPageActions.addArticleCodeBlock());
    }, [dispatch]);

    const onDeleteBlock = useCallback((index: number) => {
        dispatch(articleEditPageActions.deleteBlock(index));
    }, [dispatch]);

    const onChangeIsPreview = () => {
        dispatch(articleEditPageActions.setIsPreview(!isPreview));
    };

    const onSaveArticle = useCallback(() => {
        dispatch(saveArticle(isEdit));
    }, [dispatch, isEdit]);

    const validateErrorsTranslations = {
        [ValidateArticleError.SERVER_ERROR]: t('Серверная ошибка при сохранении'),
        [ValidateArticleError.EMPTY_MAIN]: t('Вставьте заголовки и главную картинку'),
        [ValidateArticleError.NO_BLOCKS]: t('Вставьте хотя бы один блок'),
        [ValidateArticleError.INCORRECT_ARTICLE_TYPE]: t('Укажите тип статьи'),
        [ValidateArticleError.EMPTY_BLOCKS]: t('Блоки не должны быть пустыми'),
        [ValidateArticleError.NO_DATA]: t('Данные не указаны'),
    };

    if (error) {
        return (
            <HStack
                justify="center"
                max
                className={classNames('', {}, [])}
            >
                <Text
                    variant="error"
                    title={t('Произошла ошибка при загрузке статьи')}
                    text={t('Попробуйте обновить страницу')}
                    align="center"
                />
            </HStack>
        );
    }

    if (isLoading) {
        return (
            <VStack gap="16" max>
                <Skeleton className={cls.avatar} width={200} height={200} border="50%" />
                <Skeleton className={cls.title} width={300} height={32} />
                <Skeleton className={cls.skeleton} width={600} height={24} />
                <Skeleton className={cls.skeleton} width="100%" height={200} />
                <Skeleton className={cls.skeleton} width="100%" height={200} />
            </VStack>
        );
    }

    if (!canEdit) {
        return (
            <Text variant="error" title={t('Вы не можете редактировать данную статью')} />
        );
    }

    const content = isPreview ? (
        <Card max border="round" className={className} padding="24">
            <VStack gap="16">
                <Text
                    title={formData?.title}
                    size="l"
                    bold
                />
                <Text
                    title={formData?.subtitle}
                />
                <AppImage
                    className={cls.img}
                    src={formData?.img}
                />
                {formData?.blocks.map(renderArticleBlock)}
            </VStack>
        </Card>
    ) : (
        <Page className={classNames('', {}, [className])}>
            <ArticleEditForm
                formData={formData}
                onChangeTitle={onChangeTitle}
                onChangeSubtitle={onChangeSubtitle}
                onChangeImage={onChangeImage}
                onChangeType={onChangeType}
                onChangeBlockTitle={onChangeBlockTitle}
                onChangeBlockText={onChangeBlockText}
                onChangeBlockSrc={onChangeBlockSrc}
                onChangeBlockCode={onChangeBlockCode}
                onDeleteBlock={onDeleteBlock}
            />
        </Page>
    );

    return (
        <StickyContentLayout
            content={content}
            left={(
                isPreview ? undefined : (
                    <AddArticleBlockDropdown
                        onAddArticleCodeBlock={onAddArticleCodeBlock}
                        onAddArticleImageBlock={onAddArticleImageBlock}
                        onAddArticleTextBlock={onAddArticleTextBlock}
                    />
                )
            )}
            right={(
                <Card className={cls.menu} padding="16">
                    <VStack max gap="8">
                        <Text
                            size="m"
                            text={title}
                            bold
                        />
                        <Button
                            onClick={onChangeIsPreview}
                        >
                            {isPreview ? t('Редактировать') : t('Предпросмотр')}
                        </Button>
                        <Button
                            onClick={onSaveArticle}
                        >
                            {t('Отправить')}
                        </Button>
                        {validateErrors?.length && validateErrors?.map((err) => (
                            <Text
                                variant="error"
                                text={validateErrorsTranslations[err]}
                                key={err}
                            />
                        ))}
                    </VStack>
                </Card>
            )}
        />
    );
};

export default memo(ArticleEditPage);
