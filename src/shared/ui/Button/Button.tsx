import { classNames } from 'shared/lib/classNames/classNames';
import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import cls from './Button.module.scss';

export enum ThemeButton {
    PRIMARY = 'primary',
	CLEAR = 'clear',
    OUTLINE = 'outline'
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string;
	theme?: ThemeButton;
}

export function Button(props: PropsWithChildren<ButtonProps>) {
    const {
        className,
        children,
        theme,
        ...otherProps
    } = props;

    return (
        <button
            type="button"
            className={classNames(cls.Button, {}, [className, cls[theme]])}
            {...otherProps}
        >
            {children}
        </button>
    );
}
