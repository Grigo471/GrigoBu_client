import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
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
import { getRouteArticleDetails, getRouteArticles } from '@/shared/const/router';
import { deleteArticle } from '../../model/services/deleteArticle/deleteArticle';
import { SubmitModal } from '@/features/SubmitModal';

interface ArticleEditToolbarProps {
    isPreview: boolean;
    setIsPreview: (prev: boolean) => void;
}

export const ArticleEditToolbar = memo(({ isPreview, setIsPreview }: ArticleEditToolbarProps) => {
    const { t } = useTranslation('article-edit');
    const dispatch = useAppDispatch();

    const [isDeleteModal, setIsDeleteModal] = useState(false);

    const { id } = useParams<{ id: string }>();
    const { images } = useArticleFiles();

    const navigate = useNavigate();

    const isEdit = Boolean(id);
    const title = isEdit ? t('Article editing') : t('Создание новой статьи');
    const validateErrors = useSelector(getArticleEditPageValidateErrors);
    const tags = useSelector(getArticleEditPageTags);

    const setTags = useCallback((tags: string[]) => {
        dispatch(articleEditPageActions.setTags(tags));
    }, [dispatch]);

    const onChangeIsPreview = useCallback(() => {
        setIsPreview(!isPreview);
    }, [setIsPreview, isPreview]);

    const onSaveArticle = useCallback(() => {
        dispatch(saveArticle({ isEdit, images }))
            .then(({ payload }) => {
                if (payload && 'id' in payload) navigate(getRouteArticleDetails(payload.id));
            });
    }, [dispatch, isEdit, images, navigate]);

    const onDeleteArticle = useCallback(() => {
        if (id) {
            dispatch(deleteArticle(id))
                .then(() => {
                    navigate(getRouteArticles());
                });
        }
    }, [dispatch, navigate, id]);

    const DeleteButton = memo(() => (
        <>
            <Button
                color="error"
                onClick={() => setIsDeleteModal(true)}
            >
                {t('Удалить статью')}
            </Button>
            {
                isDeleteModal && (
                    <SubmitModal
                        isOpen={isDeleteModal}
                        onClose={() => setIsDeleteModal(false)}
                        onSubmit={onDeleteArticle}
                    >
                        <Text title={t('Вы уверены, что хотите удалить статью?')} />
                    </SubmitModal>
                )
            }
        </>
    ));

    return (
        <Card className={cls.menu} padding="16" max>
            <VStack max gap="12">
                <Text
                    size="m"
                    text={title}
                    bold
                />
                <VStack adaptive gap="12">
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
                    {isEdit && (
                        <DeleteButton />
                    )}
                </VStack>
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
