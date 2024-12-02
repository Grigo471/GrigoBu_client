import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './EditableArticleImageBlock.module.scss';
import { Input } from '@/shared/ui/Input';
import { ArticleImageBlock } from '@/entities/Article';
import { AppImage } from '@/shared/ui/AppImage';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { articleEditPageActions } from '../../../model/slice/ArticleEditPageSlice';
import {
    EditableArticleBlockWrapper,
} from '../EditableArticleBlockWrapper/EditableArticleBlockWrapper';
import { FileUpload } from '@/shared/ui/FileUpload';
import { useArticleFiles } from '../../ArticleFilesProvider/ArticleFilesProvider';
import { Icon } from '@/shared/ui/Icon';
import CrossIcon from '@/shared/assets/icons/cross-delete.svg';
import { Button } from '@/shared/ui/Button';
import { srcWithApiOrBlob } from '@/shared/lib/url/srcWithApi/srcWithApi';

interface EditableArticleImageBlockProps {
   block: ArticleImageBlock;
   index: number;
}

export const EditableArticleImageBlock = memo((props: EditableArticleImageBlockProps) => {
    const {
        block, index,
    } = props;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { src } = block;
    const { addImage, deleteImage } = useArticleFiles();

    const onChangeTitle = useCallback((title: string) => {
        dispatch(articleEditPageActions.updateArticleBlockTitle(title, index));
    }, [dispatch, index]);

    const onDeleteImage = useCallback(() => {
        const fileName = src.split('/').pop();
        if (!fileName) return;
        deleteImage(fileName);
        dispatch(articleEditPageActions.deleteImage(index));
    }, [dispatch, src, deleteImage, index]);

    const onUpload = useCallback((file: File) => {
        const extension = file.name.split('.').pop();
        const url = URL.createObjectURL(file);
        const uuid = url.split('/').pop();
        if (!uuid) return;
        const newFile = new File([file], `${uuid}.${extension}`, { type: file.type });
        addImage(newFile);
        dispatch(
            articleEditPageActions.updateArticleBlockValue(url, index, 'image'),
        );
    }, [dispatch, index, addImage]);

    return (
        <EditableArticleBlockWrapper
            block={block}
            index={index}
            title={t('Блок с картинкой')}
        >
            <Input
                value={block.title}
                label={t('Подзаголовок')}
                size="s"
                onChange={onChangeTitle}
                placeholder={t('Подпись для картинки (необязательно)')}
            />
            {block.src.length === 0 && (
                <FileUpload
                    onUpload={onUpload}
                    accept="image/*"
                    className={cls.EditableAvatar}
                >
                    <Button>
                        {t('Загрузите изображение')}
                    </Button>
                </FileUpload>
            )}
            {block.src && (
                <div className={cls.imageWrapper}>
                    <Icon
                        Svg={CrossIcon}
                        className={cls.deleteBtn}
                        width={16}
                        height={16}
                        clickable
                        onClick={onDeleteImage}
                    />
                    <AppImage
                        src={srcWithApiOrBlob(block.src)}
                        className={cls.img}
                    />
                </div>
            )}
        </EditableArticleBlockWrapper>
    );
});
