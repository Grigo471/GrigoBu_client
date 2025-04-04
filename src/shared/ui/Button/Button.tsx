import {
    ForwardedRef,
    forwardRef, ReactNode, type ButtonHTMLAttributes, type PropsWithChildren,
} from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './Button.module.scss';

export type ButtonVariant = 'clear' | 'outline' | 'filled';

export type ButtonColor = 'normal' | 'success' | 'error';

export type ButtonSize = 'm' | 'l' | 'xl';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string;
	variant?: ButtonVariant;
    color?: ButtonColor;
    square?: boolean;
    size?: ButtonSize;
    disabled?: boolean;
    fullWidth?: boolean;
    addonLeft?: ReactNode;
    addonRight?: ReactNode;
}

export const Button = forwardRef((
    props: PropsWithChildren<ButtonProps>,
    ref: ForwardedRef<HTMLButtonElement>,
) => {
    const {
        className,
        children,
        variant = 'outline',
        color = 'normal',
        square,
        size = 'm',
        fullWidth,
        addonLeft,
        addonRight,
        ...otherProps
    } = props;

    const mods: Mods = {
        [cls.square]: square,
        [cls.fullWidth]: fullWidth,
        [cls.withAddon]: Boolean(addonLeft) || Boolean(addonRight),
    };

    return (
        <button
            type="button"
            className={classNames(
                cls.Button,
                mods,
                [className, cls[variant], cls[size], cls[color]],
            )}
            {...otherProps}
            ref={ref}
        >
            <div className={cls.addonLeft}>{addonLeft}</div>
            {children}
            <div className={cls.addonRight}>{addonRight}</div>
        </button>
    );
});
