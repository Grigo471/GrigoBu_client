import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ProfileCard.module.scss';
import { Card } from '@/shared/ui/Card';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import { Avatar } from '@/shared/ui/Avatar';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { fetchProfile } from '../../model/services/fetchProfile';
import {
    getProfileAmISubscribed,
    getProfileData,
} from '../../model/selectors/profileCardSelectors';
import { ReducerList, useDynamicModuleLoad } from '@/shared/lib/hooks/useDynamicModuleLoad';
import { profileCardReducers } from '../../testing';
import { getUserAuthData } from '@/entities/User';
import { srcWithApi } from '@/shared/lib/url/srcWithApi/srcWithApi';
import { SubscribeToUserButton } from '@/features/SubscribeToUserButton';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect';

interface ProfileCardProps {
   className?: string;
   username: string;
}

const reducers: ReducerList = {
    profileCard: profileCardReducers,
};

export const ProfileCard = memo((props: ProfileCardProps) => {
    const { className, username } = props;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const authData = useSelector(getUserAuthData);
    const userData = useSelector(getProfileData);
    const amISubscribed = useSelector(getProfileAmISubscribed);

    const date = userData?.createdAt?.split('T')[0];

    useInitialEffect(() => {
        dispatch(fetchProfile(username));
    });

    useDynamicModuleLoad({ reducers });

    const avatar = srcWithApi(userData?.avatar);

    if (!userData) return null;

    return (
        <Card padding="16" className={classNames(cls.EditableProfileCard, {}, [className])}>
            <HStack gap="16" max>
                <Avatar size={124} src={avatar} className={cls.avatar} />
                <VStack gap="8" max>
                    <Text title={userData?.username} size="l" />
                    <Text bold text={`${t('Рейтинг')}: ${userData.rating}`} />
                    <Text text={`${userData.subscribers} ${t('подписчиков')}`} />
                    <Text text={`${t('Грибёт с')} ${date}`} />
                    {userData?.status && <Text text={userData.status} />}
                </VStack>
                {authData
                && <SubscribeToUserButton userId={userData.id} amISubscribed={amISubscribed} />}
            </HStack>
        </Card>
    );
});
