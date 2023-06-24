import { classNames } from 'shared/lib/classNames/classNames';
import { memo, type ButtonHTMLAttributes, type PropsWithChildren } from 'react';
import cls from './Button.module.scss';

export enum ThemeButton {
	CLEAR = 'clear',
    CLEAR_INVERTED = 'clearInverted',
    OUTLINE = 'outline',
    BACKGROUND = 'background',
    BACKGROUND_INVERTED = 'backgroundInverted',
}

export enum ButtonSize {
    M = 'size_m',
    L = 'size_l',
    XL = 'size_xl',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string;
	theme?: ThemeButton;
    square?: boolean;
    size?: ButtonSize;
    disabled?: boolean;
}

export const Button = memo((props: PropsWithChildren<ButtonProps>) => {
    const {
        className,
        children,
        theme,
        square,
        size,
        ...otherProps
    } = props;

    return (
        <button
            type="button"
            className={classNames(
                cls.Button,
                { [cls.square]: square },
                [className, cls[theme], cls[size]],
            )}
            {...otherProps}
        >
            {children}
        </button>
    );
});
