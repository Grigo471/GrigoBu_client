import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import cls from './EditableProfileCard.module.scss';
import { Card } from '@/shared/ui/Card';
import { HStack, VStack } from '@/shared/ui/Stack';
import { fetchProfile, getUsername } from '@/entities/User';
import { Text } from '@/shared/ui/Text';
import { EditableAvatar } from '../EditableAvatar/EditableAvatar';
import { ReducerList, useDynamicModuleLoad } from '@/shared/lib/hooks/useDynamicModuleLoad';
import { editableProfileReducers } from '../../testing';
import { formatDateToLocal } from '@/shared/lib/helpers/date/formatDateToLocal';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { getEditableProfileData } from '../../model/selectors/editableProfileSelectors';

interface EditableProfileCardProps {
   className?: string;
}

const reducers: ReducerList = {
    editableProfileCard: editableProfileReducers,
};

export const EditableProfileCard = memo((props: EditableProfileCardProps) => {
    const { className } = props;
    const { t, i18n } = useTranslation('users');
    const username = useSelector(getUsername);
    const userData = useSelector(getEditableProfileData);

    const dispatch = useAppDispatch();

    useInitialEffect(() => {
        dispatch(fetchProfile(username || ''));
    });

    const date = formatDateToLocal(userData?.createdAt, i18n.language, false);

    useDynamicModuleLoad({ reducers });

    // const [isEdit, setIsEdit] = useState(false);

    // const editToolbar = isEdit
    //     ? (
    //         <HStack gap="8">
    //             <Button>
    //                 {t('Сохранить')}
    //             </Button>
    //             <Button
    //                 onClick={() => setIsEdit(false)}
    //             >
    //                 {t('Отмена')}
    //             </Button>
    //         </HStack>
    //     )
    //     : (
    //         <Icon Svg={SettingsIcon} clickable onClick={() => setIsEdit(true)} />
    //     );

    return (
        <Card padding="16" max className={className}>
            <HStack gap="16" max>
                <EditableAvatar className={cls.avatar} />
                <VStack gap="8" max className={cls.info}>
                    <Text title={userData?.username} size="l" />
                    <HStack max gap="16" wrap="wrap">
                        <Text bold variant="accent" text={`${t('Рейтинг')}: ${userData?.rating}`} />
                        <Text text={`${userData?.subscribers} ${t('подписчиков')}`} />
                        <Text text={`${userData?.subscriptions} ${t('подписок')}`} />
                    </HStack>
                    <Text text={`${t('Грибёт с')} ${date}`} />
                    {userData?.status && <Text text={userData.status} />}
                </VStack>
                {/* {editToolbar} */}
            </HStack>
        </Card>
    );
});
