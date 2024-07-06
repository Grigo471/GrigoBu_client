import {
    type PropsWithChildren, memo, ReactNode, useCallback,
} from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Tabs.module.scss';
import { Card, CardTheme } from '../Card/Card';

export interface TabItem<T extends string> {
   value: T;
   content: ReactNode;
}

interface TabsProps<T extends string> {
   className?: string;
   tabs: TabItem<T>[];
   value: string;
   onTabClick: (tab: TabItem<T>) => void;
}

export const TabComponent = <T extends string>(props: PropsWithChildren<TabsProps<T>>) => {
    const {
        className, tabs, value, onTabClick,
    } = props;
    const { t } = useTranslation();

    const onClickHandler = useCallback((tab: TabItem<T>) => () => {
        onTabClick(tab);
    }, [onTabClick]);

    return (
        <div className={classNames(cls.Tabs, {}, [className])}>
            {tabs.map((tab) => (
                <Card
                    theme={tab.value === value ? CardTheme.NORMAL : CardTheme.OUTLINED}
                    className={cls.tab}
                    key={tab.value}
                    onClick={onClickHandler(tab)}
                >
                    {tab.content}
                </Card>
            ))}
        </div>
    );
};

export const Tabs = memo(TabComponent) as typeof TabComponent;
