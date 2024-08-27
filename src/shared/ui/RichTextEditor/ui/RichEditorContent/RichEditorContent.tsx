import {
    ChangeEvent,
    ForwardedRef,
    forwardRef,
    HTMLAttributes,
    useMemo,
    useRef,
    useState,
} from 'react';
import cls from './RichEditorContent.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { RichTextSanitizer } from '../../helpers/RichTextSanitizer';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect';

type HTMLDivProps = Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'disabled'>;

export interface RichEditorContentProps extends HTMLDivProps {
   disabled?: boolean;
   onChange: (value: string) => void;
   value?: string;
}

export const RichEditorContent = forwardRef((
    props: RichEditorContentProps,
    ref: ForwardedRef<HTMLDivElement>,
) => {
    const {
        className,
        disabled,
        value = '',
        onChange,
        placeholder = '',
        ...otherProps
    } = props;

    const [isFocused, setIsFocused] = useState(false);

    const elRef = useRef<HTMLElement>();

    const pasteHandler = (e: ClipboardEvent) => {
        e.preventDefault();
        const paste = RichTextSanitizer(e.clipboardData?.getData('text') ?? '');
        const selection = window.getSelection();
        if (!selection?.rangeCount) return;
        selection.deleteFromDocument();
        selection.getRangeAt(0).insertNode(document.createTextNode(paste));
        selection.collapseToEnd();
        onChange(elRef.current?.innerHTML ?? '');
    };

    useInitialEffect(() => {
        if (elRef.current) {
            elRef.current.addEventListener('paste', pasteHandler);
        }

        return () => {
            if (elRef.current) {
                elRef.current.removeEventListener('paste', pasteHandler);
            }
        };
    });

    return useMemo(() => {
        function onSetRef($el: HTMLDivElement) {
            elRef.current = $el;
            if (typeof ref === 'function') {
                ref($el);
            }
        }

        function onChangeHandler(e: ChangeEvent<HTMLDivElement>) {
            const newValue = RichTextSanitizer(e.target.innerHTML);
            onChange(newValue);
        }

        const innerValue = () => {
            if (value.length > 0) return value;
            return (isFocused ? '' : placeholder);
        };

        return (
            <div className={classNames(
                cls.RichEditorContentWrapper,
                { [cls.focused]: isFocused },
                [className],
            )}
            >
                <div
                    contentEditable={!disabled}
                    dangerouslySetInnerHTML={{ __html: innerValue() }}
                    onInput={onChangeHandler}
                    className={cls.RichEditorContent}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    ref={onSetRef}
                    {...otherProps}
                />
            </div>
        );
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [disabled, className, isFocused]);
});
