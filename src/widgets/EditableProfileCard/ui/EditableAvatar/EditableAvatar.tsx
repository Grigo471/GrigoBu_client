import { memo } from 'react';
import { useSelector } from 'react-redux';
import { FileUpload } from '@/shared/ui/FileUpload';
import { Avatar } from '@/shared/ui/Avatar';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { getUserAvatar } from '@/entities/User';
import { updateAvatar } from '../../model/services/updateAvatar';
import {
    getEditableProfileAvatarError,
    getEditableProfileIsAvatarLoading,
} from '../../model/selectors/editableProfileSelectors';
import { Icon } from '@/shared/ui/Icon';
import PhotoIcon from '@/shared/assets/icons/photo.svg';
import cls from './EditableAvatar.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ImageCompressor } from '@/shared/lib/files/ImageCompressor';

interface EditableAvatarProps {
   className?: string;
}

export const EditableAvatar = memo((props: EditableAvatarProps) => {
    const { className } = props;
    const dispatch = useAppDispatch();
    const avatar = useSelector(getUserAvatar);
    const isLoading = useSelector(getEditableProfileIsAvatarLoading);
    const error = useSelector(getEditableProfileAvatarError);

    const onUpload = (file: File) => {
        const compressor = new ImageCompressor(file, {
            quality: 0.6,
            success: (compressedFile) => {
                dispatch(updateAvatar(compressedFile));
            },
            error: (error) => {
                console.log(error);
            },
        });
    };

    return (
        <FileUpload
            onUpload={onUpload}
            accept="image/*"
            className={classNames(cls.EditableAvatar, {}, [className])}
        >
            <div className={cls.overlay}>
                <Icon Svg={PhotoIcon} />
            </div>
            <Avatar size={124} src={avatar} />
        </FileUpload>
    );
});
