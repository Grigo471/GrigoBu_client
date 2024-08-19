import { memo, type PropsWithChildren } from 'react';
import { LinkProps, NavLink } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './AppLink.module.scss';

export type AppLinkVariant = 'primary' | 'red'

interface AppLinkProps extends LinkProps {
    className?: string;
    variant?: AppLinkVariant;
    activeClassname?: string;
}

export const AppLink = memo((props: PropsWithChildren<AppLinkProps>) => {
    const {
        to,
        className,
        children,
        variant = 'primary',
        activeClassname = '',
        ...otherProps
    } = props;

    return (
        <NavLink
            to={to}
            className={({ isActive }) => classNames(
                cls.AppLink,
                { [activeClassname]: isActive },
                [className, cls[variant]],
            )}
            {...otherProps}
        >
            {children}
        </NavLink>
    );
});
