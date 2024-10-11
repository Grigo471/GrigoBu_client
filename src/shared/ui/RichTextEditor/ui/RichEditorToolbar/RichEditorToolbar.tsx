import {
    memo, MouseEvent, ReactNode,
} from 'react';
import { Button } from '../../../Button';
import { HStack } from '../../../Stack';
import { InsertLinkButton } from './InsertLinkButton';

interface RichEditorToolbarProps {
   className?: string;
   selection?: Selection;
    value?: string;
}

function createButton(
    title: string,
    content: ReactNode,
    command: string,
) {
    const onAction = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        document.execCommand(command);
    };

    return (
        <Button
            square
            onMouseDown={onAction}
            tabIndex={-1}
            title={title}
        >
            {content}
        </Button>
    );
}

export const RichEditorToolbar = memo((props: RichEditorToolbarProps) => {
    const { className, selection, value = '' } = props;

    return (
        <HStack gap="4" className={className}>
            {createButton('Bold', '𝐁', 'bold')}
            {createButton('Italic', '𝑰', 'italic')}
            {createButton('Clear formatting', 'T̲ₓ', 'removeFormat')}
            <InsertLinkButton selection={selection} />
            {`${value?.length || 0} / 10000`}
        </HStack>

    );
});
