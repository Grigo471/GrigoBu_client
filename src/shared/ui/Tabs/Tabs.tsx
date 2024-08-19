import { memo, ReactNode, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Tabs.module.scss';
import { Card } from '../Card/Card';
import { Flex, FlexDirection } from '../Stack/Flex/Flex';

export interface TabItem<T extends string> {
   value: T;
   content: ReactNode;
}

interface TabsProps<T extends string> {
   className?: string;
   tabs: TabItem<T>[];
   value: string;
   onTabClick: (tab: TabItem<T>) => void;
   direction?: FlexDirection;
}

export const TabComponent = <T extends string>(props: TabsProps<T>) => {
    const {
        className, tabs, value, onTabClick, direction = 'row',
    } = props;

    const onClickHandler = useCallback((tab: TabItem<T>) => () => {
        onTabClick(tab);
    }, [onTabClick]);

    return (
        <Flex
            align="start"
            direction={direction}
            gap="8"
            className={classNames(cls.Tabs, {}, [className])}
        >
            {tabs.map((tab) => {
                const isSelected = tab.value === value;
                return (
                    <Card
                        variant={isSelected ? 'light' : 'normal'}
                        className={classNames(cls.tab, { [cls.selected]: isSelected }, [])}
                        key={tab.value}
                        onClick={onClickHandler(tab)}
                        border="round"
                    >
                        {tab.content}
                    </Card>
                );
            })}
        </Flex>
    );
};

export const Tabs = memo(TabComponent) as typeof TabComponent;
