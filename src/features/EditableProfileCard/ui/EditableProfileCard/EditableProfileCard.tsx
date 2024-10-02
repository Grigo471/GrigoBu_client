import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './EditableProfileCard.module.scss';
import { Card } from '@/shared/ui/Card';
import { HStack, VStack } from '@/shared/ui/Stack';
import { getUserAuthData } from '@/entities/User';
import { Text } from '@/shared/ui/Text';
import { EditableAvatar } from '../EditableAvatar/EditableAvatar';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import SettingsIcon from '@/shared/assets/icons/settings.svg';
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
    const { t } = useTranslation();
    const userData = useSelector(getUserAuthData);
    const [isEdit, setIsEdit] = useState(false);

    useDynamicModuleLoad({ reducers });

    const editToolbar = isEdit
        ? (
            <HStack gap="8">
                <Button>
                    {t('Сохранить')}
                </Button>
                <Button
                    onClick={() => setIsEdit(false)}
                >
                    {t('Отмена')}
                </Button>
            </HStack>
        )
        : (
            <Icon Svg={SettingsIcon} clickable onClick={() => setIsEdit(true)} />
        );

    return (
        <Card padding="16" max className={classNames(cls.EditableProfileCard, {}, [className])}>
            <HStack gap="16" max>
                <EditableAvatar />
                <VStack max>
                    <Text title={userData?.username} />
                    {userData?.status && <Text text={userData.status} />}
                </VStack>
                {editToolbar}
            </HStack>
        </Card>
    );
});
