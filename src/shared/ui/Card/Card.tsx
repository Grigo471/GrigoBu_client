import { type PropsWithChildren, memo, HTMLAttributes } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Card.module.scss';

export enum CardTheme {
    NORMAL = 'normal',
    OUTLINED = 'outlined',
}

interface CardProps extends HTMLAttributes<HTMLDivElement> {
   className?: string;
   theme?: CardTheme;
   max?: boolean;
}

export const Card = memo((props: PropsWithChildren<CardProps>) => {
    const {
        className, children, theme = CardTheme.NORMAL, max, ...otherProps
    } = props;
    const { t } = useTranslation();

    return (
        <div
            className={classNames(cls.Card, { [cls.max]: max }, [className, cls[theme]])}
            {...otherProps}
        >
            {children}
        </div>
    );
});
