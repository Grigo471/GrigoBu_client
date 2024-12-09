import { memo, useCallback } from 'react';
import { Flex, FlexDirection } from '../Stack/Flex/Flex';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Checkbox.module.scss';
import { HStack } from '../Stack';

export interface CheckboxItem<T extends string | number> {
   value: T;
   label: string;
}

interface CheckboxProps<T extends string | number> {
   items: CheckboxItem<T>[];
   className?: string;
   name: string;
   value?: T;
   onChange: (value: T) => void;
   disabled?: boolean;
   direction?: FlexDirection;
}

export const CheckboxComponent = <T extends string | number>(props: CheckboxProps<T>) => {
    const {
        className, items, name, value, onChange, disabled, direction = 'column',
    } = props;

    const onChangeHandler = useCallback((value: T) => {
        onChange(value);
    }, [onChange]);

    return (
        <Flex
            align="start"
            direction={direction}
            gap="8"
            className={classNames(cls.Radio, {}, [className])}
        >
            {items?.map((item) => (
                <HStack key={item.label} gap="4">
                    <input
                        type="checkbox"
                        id={`${name} ${item.value}`}
                        name={name}
                        value={item.value}
                        disabled={disabled}
                        checked={value === item.value}
                        onChange={() => onChangeHandler(item.value)}
                    />
                    <label
                        htmlFor={`${name} ${item.value}`}
                    >
                        {item.label}
                    </label>
                </HStack>
            ))}
        </Flex>
    );
};

export const Checkbox = memo(CheckboxComponent) as typeof CheckboxComponent;
