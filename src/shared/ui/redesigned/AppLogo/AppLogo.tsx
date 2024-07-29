import { memo } from 'react';
import cls from './AppLogo.module.scss';
import { HStack } from '../../Stack';
import AppSvg from '@/shared/assets/icons/default-avatar.svg';
import { classNames } from '@/shared/lib/classNames/classNames';

interface AppLogoProps {
   className?: string;
   size?: number;
}

export const AppLogo = memo(({ className, size = 50 }: AppLogoProps) => (
    <HStack
        max
        justify="center"
        className={classNames(cls.appLogoWrapper, {}, [className])}
    >
        <div className={cls.gradientBig} />
        <div className={cls.gradientSmall} />
        <AppSvg
            className={cls.appLogo}
            height={size}
            width={size}
            color="black"
        />
    </HStack>
));
