import { useTranslation } from 'react-i18next';
import { memo, useState } from 'react';
import { useSelector } from 'react-redux';
import { ListBox } from '@/shared/ui/Popups';
import { getFeatureFlags, updateFeatureFlags } from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { getUserAuthData } from '@/entities/User';
import { HStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import { Skeleton } from '@/shared/ui/Skeleton';

interface UIDesignSwitcherProps {
    className?: string;
}

export const UIDesignSwitcher = memo((props: UIDesignSwitcherProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const isAppRedesigned = getFeatureFlags('isAppRedesigned');
    const dispatch = useAppDispatch();
    const authData = useSelector(getUserAuthData);
    const [isLoading, setIsLoading] = useState(false);

    const items = [
        {
            content: t('Новый дизайн'),
            value: 'new',
        },
        {
            content: t('Старый дизайн'),
            value: 'old',
        },
    ];

    const onChange = async (value: string) => {
        if (authData) {
            setIsLoading(true);
            await dispatch(updateFeatureFlags({
                userId: authData?.id,
                newFeatures: {
                    isAppRedesigned: value === 'new',
                },
            })).unwrap();
            setIsLoading(false);
        }
    };

    return (
        <HStack>
            <Text text={t('Вариант интерфейса')} />
            {isLoading ? <Skeleton width={100} height={40} /> : (
                <ListBox
                    items={items}
                    onChange={onChange}
                    value={isAppRedesigned ? 'new' : 'old'}
                    className={className}
                />
            ) }

        </HStack>
    );
});
