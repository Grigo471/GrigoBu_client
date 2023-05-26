import { classNames } from 'shared/lib/classNames/classNames';
import {
    ChangeEvent,
    InputHTMLAttributes, SyntheticEvent, memo, useEffect, useRef, useState,
} from 'react';
import cls from './Input.module.scss';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>;

interface InputProps extends HTMLInputProps {
    className?: string;
    value?: string;
    onChange?: (value: string) => void;
}

export const Input = memo((props: InputProps) => {
    const {
        className,
        value,
        onChange,
        type = 'text',
        placeholder,
        autoFocus,
        ...otherProps
    } = props;

    const ref = useRef<HTMLInputElement>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [caretPosition, setCaretPosition] = useState(0);

    useEffect(() => {
        if (autoFocus) {
            ref.current?.focus();
        }

        return () => setIsFocused(false);
    }, [autoFocus]);

    const onBlur = () => setIsFocused(false);

    const onFocus = () => setIsFocused(true);

    const onSelect = (e: SyntheticEvent<HTMLDivElement, Event>) => {
        if (e.target instanceof HTMLInputElement) {
            setCaretPosition(e.target.selectionStart || 0);
        }
    };

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
        setCaretPosition(e.target.value.length);
    };

    return (
        <div className={classNames(cls.InputWrapper, {}, [className])}>
            {placeholder && (
                <div className={cls.placeholder}>
                    {`${placeholder}>`}
                </div>
            )}
            <div className={cls.caretWrapper}>
                <input
                    ref={ref}
                    type={type}
                    onChange={onChangeHandler}
                    className={cls.input}
                    value={value}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onSelect={onSelect}
                    {...otherProps}
                />
                {isFocused && (
                    <span
                        className={cls.caret}
                        style={{ left: `${caretPosition}ch` }}
                    />
                )}
            </div>
        </div>
    );
});
