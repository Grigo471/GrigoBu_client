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
    getArticleEditPageTags,
    getArticleEditPageValidateErrors,
} from '../../model/selectors/articleEditPageSelectors';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { articleEditPageActions } from '../../model/slice/ArticleEditPageSlice';
import { saveArticle } from '../../model/services/saveArticle/saveArticle';
import { validateErrorsTranslations } from '../../model/consts/consts';
import { useArticleFiles } from '../ArticleFilesProvider/ArticleFilesProvider';
import { ArticleTagsSelector } from '@/features/ArticleTagsSelector';

interface ArticleEditToolbarProps {
    isPreview: boolean;
    setIsPreview: (prev: boolean) => void;
}

export const ArticleEditToolbar = memo(({ isPreview, setIsPreview }: ArticleEditToolbarProps) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    const { id } = useParams<{ id: string }>();
    const { images } = useArticleFiles();

    const isEdit = Boolean(id);
    const title = isEdit ? t('Редактирование статьи') : t('Создание новой статьи');
    const validateErrors = useSelector(getArticleEditPageValidateErrors);
    const tags = useSelector(getArticleEditPageTags);

    const setTags = useCallback((tags: string[]) => {
        dispatch(articleEditPageActions.setTags(tags));
    }, [dispatch]);

    const onChangeIsPreview = useCallback(() => {
        setIsPreview(!isPreview);
    }, [setIsPreview, isPreview]);

    const onSaveArticle = useCallback(() => {
        dispatch(saveArticle({ isEdit, images }));
    }, [dispatch, isEdit, images]);

    return (
        <Card className={cls.menu} padding="16">
            <VStack max gap="12">
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
                <ArticleTagsSelector
                    className={cls.tags}
                    chosenTags={tags}
                    setChosenTags={setTags}
                    withCreate
                />
            </VStack>
        </Card>
    );
});
