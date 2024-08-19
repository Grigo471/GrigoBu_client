import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './EditableArticleImageBlock.module.scss';
import { Card } from '@/shared/ui/Card';
import { Input } from '@/shared/ui/Input';
import { ArticleImageBlock } from '@/entities/Article';
import { AppImage } from '@/shared/ui/AppImage';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import { Icon } from '@/shared/ui/Icon';
import CrossIcon from '@/shared/assets/icons/cross-delete.svg';

interface EditableArticleImageBlockProps {
   block: ArticleImageBlock;
   index: number;
   onChangeTitle: (value: string, index: number) => void;
   onChangeSrc: (src: string, index: number) => void;
   onDeleteBlock: (index: number) => void;
   className?: string;
}

export const EditableArticleImageBlock = memo((props: EditableArticleImageBlockProps) => {
    const {
        className, block, index, onChangeSrc, onChangeTitle, onDeleteBlock,
    } = props;
    const { t } = useTranslation();

    return (
        <Card
            max
            padding="24"
            className={classNames(cls.EditableArticleImageBlock, {}, [className])}
        >
            <VStack max gap="16">
                <HStack max justify="between">
                    <Text title={t('Блок с картинкой')} size="m" />
                    <Icon Svg={CrossIcon} clickable onClick={() => onDeleteBlock(index)} />
                </HStack>
                <Input
                    value={block.title}
                    label={t('Подзаголовок')}
                    size="s"
                    onChange={(title) => onChangeTitle(title, index)}
                    placeholder={t('Подпись для картинки (необязательно)')}
                />
                <Input
                    value={block.src}
                    label={t('Ссылка на изображение')}
                    size="s"
                    onChange={(src) => onChangeSrc(src, index)}
                    placeholder={t('Вставьте ссылку на картинку')}
                />
                {block.src && <AppImage src={block.src} className={cls.img} />}
            </VStack>
        </Card>
    );
});
