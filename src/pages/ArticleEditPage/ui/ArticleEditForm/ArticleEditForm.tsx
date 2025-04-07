import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Card } from '@/shared/ui/Card';
import { Input } from '@/shared/ui/Input';

import { renderEditableArticleBlock } from './renderEditableArticleBlock';
import { HStack, VStack } from '@/shared/ui/Stack';
import { getArticleEditPageForm } from '../../model/selectors/articleEditPageSelectors';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { articleEditPageActions } from '../../model/slice/ArticleEditPageSlice';
import { AddArticleBlockDropdown } from '../AddArticleBlockDropdown/AddArticleBlockDropdown';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleEditForm.module.scss';

interface ArticleEditFormProps {
    className?: string;
}

export const ArticleEditForm = memo((props: ArticleEditFormProps) => {
    const {
        className,
    } = props;
    const { t } = useTranslation('article-edit');
    const dispatch = useAppDispatch();

    const formData = useSelector(getArticleEditPageForm);

    const onChangeTitle = useCallback((value?: string) => {
        dispatch(articleEditPageActions.updateArticleTitle(value ?? ''));
    }, [dispatch]);

    return (
        <HStack gap="16" justify="end" align="start">
            <AddArticleBlockDropdown className={cls.dropdown} />
            <VStack
                max
                gap="16"
                className={classNames(cls.ArticleEditForm, {}, [className])}
            >
                <Card max padding="16">
                    <Input
                        size="s"
                        value={formData?.title || ''}
                        label={t('Заголовок статьи')}
                        onChange={onChangeTitle}
                    />
                </Card>
                {formData?.blocks.map((block, index) => renderEditableArticleBlock(
                    { block, index },
                ))}
            </VStack>
        </HStack>

    );
});
