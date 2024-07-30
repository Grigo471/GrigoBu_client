import {
    Listbox as HListbox,
} from '@headlessui/react';
import { Fragment, ReactNode, useMemo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { HStack } from '../../../../Stack';
import { Button } from '../../../Button/Button';
import { DropDownDirection } from '../../styles/consts';
import cls from './ListBox.module.scss';
import popupCls from '../../styles/popups.module.scss';

export interface ListBoxItem<T extends string> {
   value: T;
   content: ReactNode;
   disabled?: boolean;
}

interface ListBoxProps<T extends string> {
   items?: ListBoxItem<T>[];
   className?: string;
   value?: T;
   defaultValue?: string;
   onChange: (value: T) => void;
   readonly?: boolean;
   direction?: DropDownDirection;
   label?: string;
}

export function ListBox<T extends string>(props: ListBoxProps<T>) {
    const {
        className,
        items,
        value,
        defaultValue,
        onChange,
        readonly,
        direction = 'bottomLeft',
        label,
    } = props;

    const optionsClasses = [popupCls[direction], popupCls.menu];

    const selectedItem = useMemo(() => items?.find((item) => item.value === value), [items, value]);

    return (
        <HStack gap="4">
            {label && <span>{`${label}>`}</span>}
            <HListbox
                as="div"
                className={classNames(cls.ListBox, {}, [className, popupCls.popup])}
                value={value}
                onChange={onChange}
                disabled={readonly}
            >
                <HListbox.Button className={popupCls.trigger}>
                    <Button variant="filled" disabled={readonly}>
                        {selectedItem?.content ?? defaultValue}
                    </Button>
                </HListbox.Button>
                <HListbox.Options className={classNames(cls.options, {}, optionsClasses)}>
                    {items?.map((item) => (

                        <HListbox.Option
                            key={item.value}
                            value={item.value}
                            as={Fragment}
                            disabled={item.disabled}
                        >
                            {({ active, selected }) => (
                                <li
                                    className={classNames(
                                        cls.item,
                                        {
                                            [popupCls.active]: active,
                                            [popupCls.disabled]: item.disabled,
                                            [cls.selected]: selected,
                                        },
                                        [],
                                    )}
                                >
                                    {selected}
                                    {item.content}
                                </li>
                            )}
                        </HListbox.Option>
                    ))}
                </HListbox.Options>
            </HListbox>
        </HStack>

    );
}
