import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Card } from '@/shared/ui/Card';
import { Input } from '@/shared/ui/Input';

import { renderEditableArticleBlock } from './renderEditableArticleBlock';
import { VStack } from '@/shared/ui/Stack';
import { getArticleEditPageForm } from '../../model/selectors/articleEditPageSelectors';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { articleEditPageActions } from '../../model/slice/ArticleEditPageSlice';

interface ArticleEditFormProps {
    className?: string;
}

export const ArticleEditForm = memo((props: ArticleEditFormProps) => {
    const {
        className,
    } = props;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    const formData = useSelector(getArticleEditPageForm);

    const onChangeTitle = useCallback((value?: string) => {
        dispatch(articleEditPageActions.updateArticleTitle(value ?? ''));
    }, [dispatch]);

    const onChangeSubtitle = useCallback((value?: string) => {
        dispatch(articleEditPageActions.updateArticleSubtitle(value ?? ''));
    }, [dispatch]);

    return (
        <VStack max gap="16" className={className}>
            <Card max padding="24">
                <VStack max gap="8">
                    <Input
                        value={formData?.title || ''}
                        label={t('Заголовок статьи')}
                        onChange={onChangeTitle}
                    />
                    <Input
                        value={formData?.subtitle || ''}
                        label={t('Подзаголовок (необязательно)')}
                        onChange={onChangeSubtitle}
                    />
                </VStack>
            </Card>
            {formData?.blocks.map((block, index) => renderEditableArticleBlock(
                { block, index },
            ))}
        </VStack>
    );
});
