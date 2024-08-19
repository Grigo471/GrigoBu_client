import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './EditableArticleCodeBlock.module.scss';
import { Card } from '@/shared/ui/Card';
import { Input } from '@/shared/ui/Input';
import { ArticleCodeBlock } from '@/entities/Article';
import { TextArea } from '@/shared/ui/TextArea';
import { Text } from '@/shared/ui/Text';
import { HStack, VStack } from '@/shared/ui/Stack';
import CrossIcon from '@/shared/assets/icons/cross-delete.svg';
import { Icon } from '@/shared/ui/Icon';

interface EditableArticleCodeBlockProps {
   className?: string;
   block: ArticleCodeBlock;
   index: number;
   onChangeTitle: (title: string, index: number) => void;
   onChangeCode: (code: string, index: number) => void;
    onDeleteBlock: (index: number) => void;
}

export const EditableArticleCodeBlock = memo((props: EditableArticleCodeBlockProps) => {
    const {
        className, block, index, onChangeCode, onChangeTitle, onDeleteBlock,
    } = props;
    const { t } = useTranslation();

    return (
        <Card
            padding="24"
            max
            className={classNames(cls.EditableArticleCodeBlock, {}, [className])}
        >
            <VStack gap="16">
                <HStack max justify="between">
                    <Text title={t('Блок с кодом')} size="m" />
                    <Icon Svg={CrossIcon} clickable onClick={() => onDeleteBlock(index)} />
                </HStack>
                <Input
                    value={block.title}
                    size="m"
                    label={t('Подзаголовок')}
                    onChange={(title) => onChangeTitle(title, index)}
                    placeholder={t('Подзаголовок блока с кодом (необязательно)')}
                />
                <TextArea
                    value={block.code}
                    onChange={(code) => onChangeCode(code, index)}
                    placeholder={t('Вставьте код')}
                />
            </VStack>
        </Card>
    );
});
