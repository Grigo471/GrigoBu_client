import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import cls from './EditableProfileCard.module.scss';
import { Card } from '@/shared/ui/Card';
import { HStack, VStack } from '@/shared/ui/Stack';
import { getUserAuthData } from '@/entities/User';
import { Text } from '@/shared/ui/Text';
import { EditableAvatar } from '../EditableAvatar/EditableAvatar';
import { ReducerList, useDynamicModuleLoad } from '@/shared/lib/hooks/useDynamicModuleLoad';
import { editableProfileReducers } from '../../testing';

interface EditableProfileCardProps {
   className?: string;
}

const reducers: ReducerList = {
    editableProfileCard: editableProfileReducers,
};

export const EditableProfileCard = memo((props: EditableProfileCardProps) => {
    const { className } = props;
    const { t } = useTranslation('users');
    const userData = useSelector(getUserAuthData);

    const date = userData?.createdAt?.split('T')[0];

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
                    <Text text={`${t('Рейтинг')}: ${userData?.rating}`} />
                    <Text text={`${t('Грибёт с')} ${date}`} />
                    {userData?.status && <Text text={userData.status} />}
                </VStack>
                {/* {editToolbar} */}
            </HStack>
        </Card>
    );
});
