import { useTranslation } from 'react-i18next';

import { ProfileCardProps } from '../ProfileCardProps/ProfileCardProps';
import {
    ProfileCardRedesigned,
    ProfileCardRedesignedError,
    ProfileCardRedesignedSkeleton,
} from '../ProfileCardRedesigned/ProfileCardRedesigned';

export const ProfileCard = (props: ProfileCardProps) => {
    const {
        isLoading,
        error,
    } = props;

    const { t } = useTranslation('profile');

    if (isLoading) {
        return (
            <ProfileCardRedesignedSkeleton />
        );
    }

    if (error) {
        return (
            <ProfileCardRedesignedError />
        );
    }

    return (
        <ProfileCardRedesigned {...props} />
    );
};
