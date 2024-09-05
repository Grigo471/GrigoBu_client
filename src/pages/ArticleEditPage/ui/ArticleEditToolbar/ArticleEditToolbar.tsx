import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import cls from './ArticleEditToolbar.module.scss';
import { Card } from '@/shared/ui/Card';
import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import { Button } from '@/shared/ui/Button';
import {
    getArticleEditPageIsPreview,
    getArticleEditPageValidateErrors,
} from '../../model/selectors/articleEditPageSelectors';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { articleEditPageActions } from '../../model/slice/ArticleEditPageSlice';
import { saveArticle } from '../../model/services/saveArticle/saveArticle';
import { validateErrorsTranslations } from '../../model/consts/consts';
import { useArticleFiles } from '../ArticleFilesProvider/ArticleFilesProvider';

export const ArticleEditToolbar = memo(() => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    const { id } = useParams<{ id: string }>();
    const { images } = useArticleFiles();

    const isEdit = Boolean(id);
    const title = isEdit ? t('Редактирование статьи') : t('Создание новой статьи');

    const isPreview = useSelector(getArticleEditPageIsPreview);
    const validateErrors = useSelector(getArticleEditPageValidateErrors);

    const onChangeIsPreview = useCallback(() => {
        dispatch(articleEditPageActions.setIsPreview(!isPreview));
    }, [dispatch, isPreview]);

    const onSaveArticle = useCallback(() => {
        dispatch(saveArticle({ isEdit, images }));
    }, [dispatch, isEdit, images]);

    return (
        <Card className={cls.menu} padding="16">
            <VStack max gap="16">
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
                        text={t(validateErrorsTranslations[err])}
                        key={err}
                    />
                ))}
            </VStack>
        </Card>
    );
});
