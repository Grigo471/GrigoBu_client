import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ArticleTextBlock } from '@/entities/Article';
import { Input } from '@/shared/ui/Input';
import { RichTextEditor } from '@/shared/ui/RichTextEditor';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { articleEditPageActions } from '../../../model/slice/ArticleEditPageSlice';
import {
    EditableArticleBlockWrapper,
} from '../EditableArticleBlockWrapper/EditableArticleBlockWrapper';

interface EditableArticleTextBlockProps {
   block: ArticleTextBlock;
   index: number;
}

export const EditableArticleTextBlock = memo((props: EditableArticleTextBlockProps) => {
    const {
        block, index,
    } = props;

    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    const onChangeTitle = useCallback((title: string) => {
        dispatch(articleEditPageActions.updateArticleBlockTitle(title, index));
    }, [dispatch, index]);

    const onChangeText = useCallback((text: string) => {
        dispatch(
            articleEditPageActions.updateArticleBlockValue(text, index, 'text'),
        );
    }, [dispatch, index]);

    return (
        <EditableArticleBlockWrapper
            index={index}
            title={t('Текстовый блок')}
            block={block}
        >
            <Input
                label={t('Подзаголовок')}
                size="s"
                value={block.title}
                onChange={onChangeTitle}
                placeholder={t('Подзаголовок текстового блока (необязательно)')}
            />
            <RichTextEditor
                value={block.paragraphs}
                onChange={onChangeText}
                placeholder={t('Введите текст')}
            />
        </EditableArticleBlockWrapper>
    );
});
