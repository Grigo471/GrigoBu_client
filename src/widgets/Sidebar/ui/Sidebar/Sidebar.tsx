import {
    PropsWithChildren, memo, useMemo, useState,
} from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import { LangSwitcher } from '@/features/LangSwitcher';
import { Button, ButtonSize, ThemeButton } from '@/shared/ui/deprecated/Button';
import { VStack } from '@/shared/ui/Stack';
import { getSidebarItems } from '../../model/selectors/getSidebarItems';
import cls from './Sidebar.module.scss';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import { ToggleFeatures } from '@/shared/lib/features';
import { AppLogo } from '@/shared/ui/redesigned/AppLogo';
import { Icon } from '@/shared/ui/redesigned/Icon';
import ArrowIcon from '@/shared/assets/icons/arrow-bottom.svg';

interface SidebarProps {
    className?: string;
}

export const Sidebar = memo((props: PropsWithChildren<SidebarProps>) => {
    const { className } = props;

    const [collapsed, setCollapsed] = useState(false);

    const SidebarItemsList = useSelector(getSidebarItems);

    const onToggle = () => {
        setCollapsed((prev) => !prev);
    };

    const ItemsList = useMemo(() => SidebarItemsList.map((item) => (
        <SidebarItem
            item={item}
            collapsed={collapsed}
            key={item.path}
        />
    )), [collapsed, SidebarItemsList]);

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={(
                <aside
                    data-testid="sidebar"
                    className={classNames(
                        cls.SidebarRedesigned,
                        { [cls.collapsedRedesigned]: collapsed },
                        [className],
                    )}
                >
                    <AppLogo size={collapsed ? 30 : 50} className={cls.appLogo} />
                    <VStack role="navigation" gap="8" className={cls.items}>
                        {ItemsList}
                    </VStack>
                    <Icon
                        data-testid="sidebar-toggle"
                        onClick={onToggle}
                        className={cls.collapseBtn}
                        Svg={ArrowIcon}
                        clickable
                    />
                    <div className={cls.switchers}>
                        <ThemeSwitcher />
                        <LangSwitcher className={cls.lang} short={collapsed} />
                    </div>
                </aside>
            )}
            off={(
                <aside
                    data-testid="sidebar"
                    className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [className])}
                >
                    <Button
                        data-testid="sidebar-toggle"
                        onClick={onToggle}
                        className={cls.collapseBtn}
                        theme={ThemeButton.BACKGROUND_INVERTED}
                        square
                        size={ButtonSize.L}
                    >
                        {collapsed ? '>' : '<'}
                    </Button>

                    <VStack role="navigation" gap="8" className={cls.items}>
                        {ItemsList}
                    </VStack>

                    <div className={cls.switchers}>
                        <ThemeSwitcher />
                        <LangSwitcher className={cls.lang} short={collapsed} />
                    </div>
                </aside>
            )}
        />
    );
});
