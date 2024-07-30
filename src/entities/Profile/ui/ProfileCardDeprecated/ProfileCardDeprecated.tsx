import { useTranslation } from 'react-i18next';
import { Mods, classNames } from '@/shared/lib/classNames/classNames';
import { Text as TextDeprecated, TextAlign, TextTheme } from '@/shared/ui/deprecated/Text';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import { Loader } from '@/shared/ui/deprecated/Loader';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar';
import { CurrencySelect } from '@/entities/Currency';
import { CountrySelect } from '@/entities/Country';
import { HStack, VStack } from '@/shared/ui/Stack';
import cls from './ProfileCardDeprecated.module.scss';
import { ProfileCardProps } from '../ProfileCardProps/ProfileCardProps';

export const ProfileCardDeprecatedError = () => {
    const { t } = useTranslation('profile');
    return (
        <HStack
            justify="center"
            max
            className={classNames(cls.ProfileCard, {}, [cls.error])}
        >
            <TextDeprecated
                theme={TextTheme.ERROR}
                title={t('Произошла ошибка при загрузке профиля')}
                text={t('Попробуйте обновить страницу')}
                align={TextAlign.CENTER}
            />
        </HStack>
    );
};

export const ProfileCardDeprecatedLoader = () => (
    <HStack
        justify="center"
        max
        className={classNames(cls.ProfileCard, {}, [cls.loading])}
    >
        <Loader />
    </HStack>
);

export const ProfileCardDeprecated = (props: ProfileCardProps) => {
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

    const { t } = useTranslation('profile');

    const mods: Mods = {
        [cls.editing]: !readOnly,
    };

    return (
        <VStack gap="16" max className={classNames(cls.ProfileCard, mods, [className])}>
            {data?.avatar && (
                <HStack justify="center" max className={cls.AvatarWrapper}>
                    <AvatarDeprecated src={data?.avatar} alt={data.username} />
                </HStack>
            )}
            <InputDeprecated
                value={data?.first}
                placeholder={t('Имя')}
                className={cls.input}
                onChange={onChangeFirstName}
                readOnly={readOnly}
                data-testid="ProfileCard.FirstName"
            />
            <InputDeprecated
                value={data?.last}
                placeholder={t('Фамилия')}
                className={cls.input}
                onChange={onChangeLastName}
                readOnly={readOnly}
                data-testid="ProfileCard.LastName"
            />
            <InputDeprecated
                value={data?.age}
                placeholder={t('Возраст')}
                className={cls.input}
                onChange={onChangeAge}
                readOnly={readOnly}
            />
            <InputDeprecated
                value={data?.city}
                placeholder={t('Город')}
                className={cls.input}
                onChange={onChangeCity}
                readOnly={readOnly}
            />
            <InputDeprecated
                value={data?.username}
                placeholder={t('Никнейм')}
                className={cls.input}
                onChange={onChangeUsername}
                readOnly={readOnly}
            />
            <InputDeprecated
                value={data?.avatar}
                placeholder={t('Ссылка на аватар')}
                className={cls.input}
                onChange={onChangeAvatar}
                readOnly={readOnly}
            />
            <CurrencySelect
                value={data?.currency}
                onChange={onChangeCurrency}
                readonly={readOnly}
                className={cls.input}
            />
            <CountrySelect
                value={data?.country}
                onChange={onChangeCountry}
                readonly={readOnly}
                className={cls.input}
            />
        </VStack>
    );
};
