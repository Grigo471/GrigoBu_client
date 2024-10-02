import { memo } from 'react';
import cls from './AppLogo.module.scss';
import { HStack } from '../Stack';
import AppSvg from '@/shared/assets/icons/igloo.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text } from '../Text';
import { APP_NAME } from '@/shared/const/consts';

interface AppLogoProps {
   className?: string;
   size?: number;
}

export const AppLogo = memo(({ className, size = 50 }: AppLogoProps) => (
    <HStack
        max
        gap="16"
        justify="center"
        className={classNames(cls.appLogoWrapper, {}, [className])}
    >
        <AppSvg
            className={cls.appLogo}
            height={size}
            width={size}
            color="black"
        />
        <Text title={APP_NAME} size="l" bold />
    </HStack>
));
