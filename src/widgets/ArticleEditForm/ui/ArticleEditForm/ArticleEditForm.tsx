import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './ArticleEditForm.module.scss';
import { Card } from '@/shared/ui/Card';
import { Input } from '@/shared/ui/Input';

import { renderEditableArticleBlock } from './renderEditableArticleBlock';
import { VStack } from '@/shared/ui/Stack';
import { AppImage } from '@/shared/ui/AppImage';
import { Article, ArticleType } from '@/entities/Article';
import { Text } from '@/shared/ui/Text';

interface ArticleEditFormProps {
    className?: string;
    formData?: Article;
    onChangeTitle: (title: string) => void;
    onChangeSubtitle: (subtitle: string) => void;
    onChangeImage: (src: string) => void;
    onChangeType: (type: ArticleType) => void;
    onChangeBlockTitle: (title: string, index: number) => void;
    onChangeBlockText: (text: string, index: number) => void;
    onChangeBlockSrc: (src: string, index: number) => void;
    onChangeBlockCode: (code: string, index: number) => void;
    onDeleteBlock: (index: number) => void;
}

export const ArticleEditForm = memo((props: ArticleEditFormProps) => {
    const {
        className,
        formData,
        onChangeTitle,
        onChangeSubtitle,
        onChangeImage,
        onChangeType,
        onChangeBlockTitle,
        onChangeBlockText,
        onChangeBlockSrc,
        onChangeBlockCode,
        onDeleteBlock,
    } = props;
    const { t } = useTranslation();

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
                        label={t('Подзаголовок')}
                        onChange={onChangeSubtitle}
                    />
                    <Input
                        value={formData?.img || ''}
                        label={t('Ссылка на основную картинку')}
                        onChange={onChangeImage}
                    />
                    {formData?.img && (
                        <AppImage
                            src={formData.img}
                            errorFallback={(
                                <Text
                                    variant="error"
                                    text={t('Не удалось загрузить картинку')}
                                />
                            )}
                            className={cls.img}
                        />
                    )}
                </VStack>
            </Card>
            {formData?.blocks.map((block, index) => renderEditableArticleBlock(
                {
                    block,
                    index,
                    onChangeBlockTitle,
                    onChangeBlockCode,
                    onChangeBlockSrc,
                    onChangeBlockText,
                    onDeleteBlock,
                },
            ))}
        </VStack>
    );
});
