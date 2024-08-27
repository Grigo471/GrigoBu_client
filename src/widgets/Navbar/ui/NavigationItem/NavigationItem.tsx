import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getUserAuthData } from '@/entities/User';
import cls from './NavigationItem.module.scss';
import { AppLink } from '@/shared/ui/AppLink';
import { NavigationItemType } from '../../model/types/NavigationItem';

interface SidebarItemProps {
    item: NavigationItemType,
}

export function NavigationItem({ item }: SidebarItemProps) {
    const { t } = useTranslation();

    const isAuth = useSelector(getUserAuthData);

    if (item.authOnly && !isAuth) {
        return null;
    }

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
