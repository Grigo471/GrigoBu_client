import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './EditableArticleTextBlock.module.scss';
import { ArticleTextBlock } from '@/entities/Article';
import { Card } from '@/shared/ui/Card';
import { Input } from '@/shared/ui/Input';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import { Icon } from '@/shared/ui/Icon';
import CrossIcon from '@/shared/assets/icons/cross-delete.svg';
import { RichTextEditor } from '@/shared/ui/RichTextEditor';

interface EditableArticleTextBlockProps {
   block: ArticleTextBlock;
   index: number;
   onChangeText: (value: string, index: number) => void;
   onChangeTitle: (title: string, index: number) => void;
    onDeleteBlock: (index: number) => void;
   className?: string;
}

export const EditableArticleTextBlock = memo((props: EditableArticleTextBlockProps) => {
    const {
        className, block, index, onChangeText, onChangeTitle, onDeleteBlock,
    } = props;

    const { t } = useTranslation();

    return (
        <Card
            max
            padding="24"
            className={classNames(cls.EditableArticleTextBlock, {}, [className])}
        >
            <VStack max gap="16">
                <HStack max justify="between">
                    <Text title={t('Текстовый блок')} size="m" />
                    <Icon Svg={CrossIcon} clickable onClick={() => onDeleteBlock(index)} />
                </HStack>
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
            </VStack>
        </Card>
    );
});
