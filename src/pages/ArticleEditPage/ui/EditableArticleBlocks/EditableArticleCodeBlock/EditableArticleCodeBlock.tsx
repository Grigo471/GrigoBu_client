import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '@/shared/ui/Input';
import { ArticleCodeBlock } from '@/entities/Article';
import { TextArea } from '@/shared/ui/TextArea';
import { articleEditPageActions } from '../../../model/slice/ArticleEditPageSlice';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import {
    EditableArticleBlockWrapper,
} from '../EditableArticleBlockWrapper/EditableArticleBlockWrapper';

interface EditableArticleCodeBlockProps {
   block: ArticleCodeBlock;
   index: number;
}

export const EditableArticleCodeBlock = memo((props: EditableArticleCodeBlockProps) => {
    const {
        block, index,
    } = props;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    const onChangeTitle = useCallback((title: string, index: number) => {
        dispatch(articleEditPageActions.updateArticleBlockTitle(title, index));
    }, [dispatch]);

    const onChangeCode = useCallback((code: string, index: number) => {
        dispatch(
            articleEditPageActions.updateArticleBlockValue(code, index, 'code'),
        );
    }, [dispatch]);

    return (
        <EditableArticleBlockWrapper
            block={block}
            index={index}
            title={t('Блок с кодом')}
        >
            <Input
                value={block.title}
                size="s"
                label={t('Подзаголовок')}
                onChange={(title) => onChangeTitle(title, index)}
                placeholder={t('Подзаголовок блока с кодом (необязательно)')}
            />
            <TextArea
                value={block.code}
                onChange={(code) => onChangeCode(code, index)}
                placeholder={t('Вставьте код')}
            />
        </EditableArticleBlockWrapper>
    );
});
