import { Menu } from '@headlessui/react';
import { Fragment, ReactNode } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLink } from '../../../AppLink/AppLink';
import { DropDownDirection } from '../../styles/consts';
import cls from './Dropdown.module.scss';
import popupCls from '../../styles/popups.module.scss';

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
   disabled?: boolean;
}

export function Dropdown(props: DropdownProps) {
    const {
        className, trigger, items, direction = 'bottomRight', disabled = false,
    } = props;

    const menuClasses = [popupCls[direction], popupCls.menu];

    return (
        <Menu as="div" className={classNames(cls.Dropdown, {}, [className, popupCls.popup])}>
            <Menu.Button disabled={disabled} className={popupCls.trigger}>
                {trigger}
            </Menu.Button>
            <Menu.Items className={classNames(cls.menu, {}, menuClasses)}>
                {items.map((item, index) => {
                    const content = ({ active }: { active: boolean }) => (
                        <button
                            type="button"
                            onClick={item.onClick}
                            className={classNames(cls.item, { [popupCls.active]: active }, [])}
                            disabled={item.disabled}
                        >
                            {item.content}
                        </button>
                    );

                    if (item.href) {
                        return (
                            <Menu.Item
                                key={`dropdown-key-${index}`}
                                as={AppLink}
                                to={item.href}
                                disabled={item.disabled}
                            >
                                {content}
                            </Menu.Item>
                        );
                    }

                    return (
                        <Menu.Item
                            key={`dropdown-key-${index}`}
                            as={Fragment}
                            disabled={item.disabled}
                        >
                            {content}
                        </Menu.Item>
                    );
                })}

            </Menu.Items>
        </Menu>
    );
}
