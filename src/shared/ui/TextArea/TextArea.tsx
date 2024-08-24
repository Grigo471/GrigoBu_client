import {
    ChangeEvent,
    memo, TextareaHTMLAttributes, useEffect, useRef, useState,
} from 'react';
import { Mods, classNames } from '@/shared/lib/classNames/classNames';
import cls from './TextArea.module.scss';
import { Text } from '../Text';
import { VStack } from '../Stack';

type HTMLTextAreaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>,
    'value' | 'onChange' | 'readOnly'>;

interface TextAreaProps extends HTMLTextAreaProps {
    className?: string;
    value?: string;
    label?: string;
    onChange: (value: string) => void;
    readOnly?: boolean;
}

export const TextArea = memo((props: TextAreaProps) => {
    const {
        className,
        value,
        label,
        onChange,
        placeholder,
        autoFocus,
        readOnly,
        ...otherProps
    } = props;

    const ref = useRef<HTMLTextAreaElement>(null);
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        if (autoFocus) {
            ref.current?.focus();
        }

        return () => setIsFocused(false);
    }, [autoFocus]);

    useEffect(() => {
        const textarea = ref.current;
        const listener = (e: KeyboardEvent) => {
            if (e.key === 'Tab' && textarea) {
                e.preventDefault();
                const start = textarea.selectionStart;
                const end = textarea.selectionEnd;

                onChange(`${value?.substring(0, start)}\t${value?.substring(end)}`);

                textarea.selectionStart = start + 1;
                textarea.selectionEnd = start + 1;
            }
        };

        textarea?.addEventListener('keydown', listener);

        return () => textarea?.removeEventListener('keydown', listener);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value, onChange]);

    const onBlur = () => setIsFocused(false);

    const onFocus = () => setIsFocused(true);

    const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        onChange?.(e.target.value);
    };

    const mods: Mods = {
        [cls.readOnly]: readOnly,
        [cls.focused]: isFocused,
    };

    const input = (
        <div className={classNames(cls.TextAreaWrapper, mods, [className])}>
            <textarea
                ref={ref}
                value={value}
                onChange={onChangeHandler}
                className={cls.TextArea}
                onFocus={onFocus}
                onBlur={onBlur}
                readOnly={readOnly}
                placeholder={placeholder}
                {...otherProps}
            />
        </div>
    );

    if (label) {
        return (
            <VStack max gap="8">
                <Text text={label} />
                {input}
            </VStack>
        );
    }

    return input;
});
