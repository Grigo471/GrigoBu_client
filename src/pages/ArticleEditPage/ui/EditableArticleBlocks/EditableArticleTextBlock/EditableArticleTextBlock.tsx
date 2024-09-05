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

    const onChangeTitle = useCallback((title: string, index: number) => {
        dispatch(articleEditPageActions.updateArticleBlockTitle(title, index));
    }, [dispatch]);

    const onChangeText = useCallback((text: string, index: number) => {
        dispatch(
            articleEditPageActions.updateArticleBlockValue(text, index, 'text'),
        );
    }, [dispatch]);

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
                onChange={(title) => onChangeTitle(title, index)}
                placeholder={t('Подзаголовок текстового блока (необязательно)')}
            />
            <RichTextEditor
                value={block.paragraphs}
                onChange={(value) => onChangeText(value, index)}
            />
        </EditableArticleBlockWrapper>
    );
});
