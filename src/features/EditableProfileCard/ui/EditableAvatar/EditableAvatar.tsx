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

interface EditableAvatarProps {
   className?: string;
}

export const EditableAvatar = memo((props: EditableAvatarProps) => {
    const { className } = props;
    const dispatch = useAppDispatch();
    const avatar = useSelector(getUserAvatar);
    const avatarSrc = avatar ? __API__ + avatar : '';
    const isLoading = useSelector(getEditableProfileIsAvatarLoading);
    const error = useSelector(getEditableProfileAvatarError);

    const onUpload = (file: File) => {
        dispatch(updateAvatar(file));
    };

    return (
        <FileUpload
            onUpload={onUpload}
            accept="image/*"
            className={cls.EditableAvatar}
        >
            <div className={cls.overlay}>
                <Icon Svg={PhotoIcon} />
            </div>
            <Avatar className={className} src={avatarSrc} />
        </FileUpload>
    );
});
