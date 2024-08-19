import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { getUserAuthData } from '@/entities/User';
import { SidebarItemType } from '../../model/types/sidebar';
import cls from './SidebarItem.module.scss';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { Icon } from '@/shared/ui/redesigned/Icon';

interface SidebarItemProps {
    item: SidebarItemType,
    collapsed: boolean,
}

export function SidebarItem({ item, collapsed }: SidebarItemProps) {
    const { t } = useTranslation();

    const isAuth = useSelector(getUserAuthData);

    if (item.authOnly && !isAuth) {
        return null;
    }

    return (

        <AppLink
            to={item.path}
            className={classNames(
                cls.itemRedesigned,
                { [cls.collapsedRedesigned]: collapsed },
                [],
            )}
            activeClassname={cls.active}
        >
            <Icon Svg={item.Icon} />
            <span className={cls.link}>
                {t(item.text)}
            </span>
        </AppLink>

    );
}
