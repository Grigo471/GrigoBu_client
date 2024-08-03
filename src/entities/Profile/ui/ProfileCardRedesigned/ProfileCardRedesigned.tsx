import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ProfileCardProps } from '../ProfileCardProps/ProfileCardProps';
import { Card } from '@/shared/ui/redesigned/Card';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Input } from '@/shared/ui/redesigned/Input';
import { CurrencySelect } from '@/entities/Currency';
import { CountrySelect } from '@/entities/Country';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { Text } from '@/shared/ui/redesigned/Text';

export const ProfileCardRedesignedError = () => {
    const { t } = useTranslation('profile');
    return (
        <HStack
            justify="center"
            max
            className={classNames('', {}, [])}
        >
            <Text
                variant="error"
                title={t('Произошла ошибка при загрузке профиля')}
                text={t('Попробуйте обновить страницу')}
                align="center"
            />
        </HStack>
    );
};

export const ProfileCardRedesignedSkeleton = () => (
    <Card padding="24" max>
        <VStack gap="32">
            <HStack max justify="center">
                <Skeleton border="100%" width={128} height={128} />
            </HStack>
            <HStack gap="32" max>
                <VStack gap="16" max>
                    <Skeleton width="100%" height={38} />
                    <Skeleton width="100%" height={38} />
                    <Skeleton width="100%" height={38} />
                    <Skeleton width="100%" height={38} />
                </VStack>
                <VStack gap="16" max>
                    <Skeleton width="100%" height={38} />
                    <Skeleton width="100%" height={38} />
                    <Skeleton width="100%" height={38} />
                    <Skeleton width="100%" height={38} />
                </VStack>
            </HStack>
        </VStack>
    </Card>
);

export const ProfileCardRedesigned = memo((props: ProfileCardProps) => {
    const { t } = useTranslation('profile');

    const {
        className,
        data,
        readOnly,
        onChangeFirstName,
        onChangeLastName,
        onChangeAge,
        onChangeCity,
        onChangeUsername,
        onChangeAvatar,
        onChangeCurrency,
        onChangeCountry,
    } = props;

    return (
        <Card
            padding="24"
            max
            className={className}
            border="partial"
        >
            <VStack gap="32">
                {data?.avatar && (
                    <HStack justify="center" max>
                        <Avatar size={128} src={data?.avatar} alt={data.username} />
                    </HStack>
                )}
                <HStack max gap="24">
                    <VStack max gap="16">
                        <Input
                            value={data?.first}
                            label={t('Имя')}
                            onChange={onChangeFirstName}
                            readOnly={readOnly}
                            data-testid="ProfileCard.FirstName"
                        />
                        <Input
                            value={data?.last}
                            label={t('Фамилия')}
                            onChange={onChangeLastName}
                            readOnly={readOnly}
                            data-testid="ProfileCard.LastName"
                        />
                        <Input
                            value={data?.age}
                            label={t('Возраст')}
                            onChange={onChangeAge}
                            readOnly={readOnly}
                        />
                        <Input
                            value={data?.city}
                            label={t('Город')}
                            onChange={onChangeCity}
                            readOnly={readOnly}
                        />
                    </VStack>
                    <VStack max gap="16">
                        <Input
                            value={data?.username}
                            label={t('Никнейм')}
                            onChange={onChangeUsername}
                            readOnly={readOnly}
                        />
                        <Input
                            value={data?.avatar}
                            label={t('Ссылка на аватар')}
                            onChange={onChangeAvatar}
                            readOnly={readOnly}
                        />
                        <CurrencySelect
                            value={data?.currency}
                            onChange={onChangeCurrency}
                            readonly={readOnly}
                        />
                        <CountrySelect
                            value={data?.country}
                            onChange={onChangeCountry}
                            readonly={readOnly}
                        />
                    </VStack>
                </HStack>
            </VStack>
        </Card>
    );
});
