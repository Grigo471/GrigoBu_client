import { Menu } from '@headlessui/react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Fragment, ReactNode } from 'react';
import { DropDownDirection } from 'shared/types/ui';
import cls from './Dropdown.module.scss';
import { AppLink } from '../AppLink/AppLink';

export interface DropdownItem {
   disabled?: boolean;
   content?: ReactNode;
   onClick?: () => void;
   href?: string;
}

interface DropdownProps {
   className?: string;
   items: DropdownItem[];
   trigger: ReactNode;
   direction?: DropDownDirection;
}

export function Dropdown(props: DropdownProps) {
    const {
        className, trigger, items, direction = 'bottomRight',
    } = props;

    const menuClasses = [cls[direction]];

    return (
        <Menu as="div" className={classNames(cls.Dropdown, {}, [className])}>
            <Menu.Button className={cls.btn}>
                {trigger}
            </Menu.Button>
            <Menu.Items className={classNames(cls.menu, {}, menuClasses)}>
                {items.map((item) => {
                    const content = ({ active }: { active: boolean }) => (
                        <button
                            type="button"
                            onClick={item.onClick}
                            className={classNames(cls.item, { [cls.active]: active }, [])}
                            disabled={item.disabled}
                        >
                            {item.content}
                        </button>
                    );

                    if (item.href) {
                        return (
                            <Menu.Item as={AppLink} to={item.href} disabled={item.disabled}>
                                {content}
                            </Menu.Item>
                        );
                    }

                    return (
                        <Menu.Item as={Fragment} disabled={item.disabled}>
                            {content}
                        </Menu.Item>
                    );
                })}

            </Menu.Items>
        </Menu>
    );
}
