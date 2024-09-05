import { useTranslation } from 'react-i18next';
import cls from './NavigationItem.module.scss';
import { AppLink } from '@/shared/ui/AppLink';
import { NavigationItemType } from '../../model/types/NavigationItemsList';

interface SidebarItemProps {
    item: NavigationItemType,
}

export function NavigationItem({ item }: SidebarItemProps) {
    const { t } = useTranslation();

    return (

        <AppLink
            to={item.path}
            className={cls.NavigationItem}
            activeClassname={cls.active}
        >
            <span className={cls.link}>
                {t(item.text)}
            </span>
        </AppLink>

    );
}
