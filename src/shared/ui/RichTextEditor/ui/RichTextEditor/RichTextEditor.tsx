import { useCallback, useRef, useState } from 'react';
import { VStack } from '../../../Stack';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect';
import { RichEditorContent } from '../RichEditorContent/RichEditorContent';
import { RichEditorToolbar } from '../RichEditorToolbar/RichEditorToolbar';

interface RichTextEditorProps {
   className?: string;
   value: string;
   onChange: (value: string) => void;
   readOnly?: boolean;
   placeholder?: string;
}

export const RichTextEditor = (props: RichTextEditorProps) => {
    const {
        className,
        value,
        onChange,
        placeholder,
        readOnly,
    } = props;

    const contentRef = useRef<HTMLDivElement>();
    const [selection, setSelection] = useState<Selection>();

    function onClickOutside(event: MouseEvent) {
        if (event.target === contentRef.current) {
            return;
        }
        if (contentRef.current?.contains(event.target as HTMLElement)) {
            return;
        }
        setSelection(undefined);
    }

    function getSelectedNode(): Selection | undefined {
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
            return selection || undefined;
        }

        return undefined;
    }

    const onTextSelect = useCallback(() => {
        setSelection(getSelectedNode());
    }, []);

    function setContentEditableRef(el: HTMLDivElement) {
        contentRef.current = el;
    }

    useInitialEffect(() => {
        document.addEventListener('click', onClickOutside);
        return () => document.removeEventListener('click', onClickOutside);
    });

    return (
        <VStack max className={className} gap="4">
            <RichEditorToolbar selection={selection} value={value} />
            <RichEditorContent
                ref={setContentEditableRef}
                value={value}
                placeholder={placeholder}
                disabled={readOnly}
                onChange={onChange}
                onSelect={onTextSelect}
            />
        </VStack>
    );
};
