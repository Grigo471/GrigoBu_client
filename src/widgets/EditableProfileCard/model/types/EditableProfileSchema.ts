import { User } from '@/entities/User';

export interface EditableProfileSchema {
    avatarError?: string;
    isAvatarLoading?: boolean;
    infoError?: string;
    isInfoLoading?: boolean;
    profileData?: User;
    isLoading?: boolean;
    error?: string;
}
