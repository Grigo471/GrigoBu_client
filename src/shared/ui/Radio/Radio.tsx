import { memo, useCallback } from 'react';
import { Flex, FlexDirection } from '../Stack/Flex/Flex';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Radio.module.scss';
import { HStack } from '../Stack';

export interface RadioItem<T extends string> {
   value: T;
   label: string;
}

interface RadioProps<T extends string> {
   items: RadioItem<T>[];
   className?: string;
   name: string;
   value?: T;
   onChange: (value: T) => void;
   disabled?: boolean;
   direction?: FlexDirection;
}

export const RadioComponent = <T extends string>(props: RadioProps<T>) => {
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
                <HStack gap="4">
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

export const Radio = memo(RadioComponent) as typeof RadioComponent;
