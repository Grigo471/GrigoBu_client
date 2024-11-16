import { memo, useCallback, useEffect } from 'react';
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
import { Button } from '@/shared/ui/Button';
import { subscribeToUser } from '../../model/services/subscribeToUser';
import { ReducerList, useDynamicModuleLoad } from '@/shared/lib/hooks/useDynamicModuleLoad';
import { profileCardReducers } from '../../testing';
import { unsubscribeToUser } from '../../model/services/unsubscribeToUser';
import { getUserAuthData } from '@/entities/User';
import { srcWithApi } from '@/shared/lib/url/srcWithApi/srcWithApi';

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

    useEffect(() => {
        dispatch(fetchProfile(username));
    }, [username, dispatch]);

    const onSubscribe = useCallback(() => {
        if (userData?.id) dispatch(subscribeToUser(userData.id));
    }, [dispatch, userData?.id]);

    const onUnSubscribe = useCallback(() => {
        if (userData?.id) dispatch(unsubscribeToUser(userData.id));
    }, [dispatch, userData?.id]);

    useDynamicModuleLoad({ reducers });

    const subscribeButton = amISubscribed ? (
        <Button
            className={cls.subscribeButton}
            onClick={onUnSubscribe}
        >
            {t('Вы подписаны')}
        </Button>
    ) : (
        <Button
            onClick={onSubscribe}
        >
            {t('Подписаться')}
        </Button>
    );

    const avatar = srcWithApi(userData?.avatar);

    if (!userData) return null;

    return (
        <Card padding="16" className={classNames(cls.EditableProfileCard, {}, [className])}>
            <HStack gap="16" max>
                <Avatar size={124} src={avatar} className={cls.avatar} />
                <VStack gap="8" max className={cls.info}>
                    <Text title={userData?.username} size="l" />
                    <Text text={`${t('Рейтинг')}: ${userData.rating}`} />
                    <Text text={`${t('Грибёт с')} ${date}`} />
                    {userData?.status && <Text text={userData.status} />}
                </VStack>
                {authData && subscribeButton}
            </HStack>
        </Card>
    );
});
