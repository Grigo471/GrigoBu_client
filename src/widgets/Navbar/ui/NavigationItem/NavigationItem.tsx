import { useTranslation } from 'react-i18next';
import cls from './NavigationItem.module.scss';
import { AppLink } from '@/shared/ui/AppLink';
import { NavigationItemType } from '../../model/types/NavigationItemsList';
import { classNames } from '@/shared/lib/classNames/classNames';

interface SidebarItemProps {
    item: NavigationItemType,
    collapsed?: boolean
}

export function NavigationItem({ item, collapsed = false }: SidebarItemProps) {
    const { t } = useTranslation();

    return (

        <AppLink
            to={item.path}
            className={classNames(cls.NavigationItem, { [cls.collapsed]: collapsed }, [])}
            activeClassname={cls.active}
        >
            <span className={cls.link}>
                {t(item.text)}
            </span>
        </AppLink>

    );
}
