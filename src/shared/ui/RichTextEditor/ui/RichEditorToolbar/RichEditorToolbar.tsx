import {
    memo, MouseEvent, ReactNode,
} from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './RichEditorToolbar.module.scss';
import { Button } from '../../../Button';
import { HStack } from '../../../Stack';

export type RichToolbarButtonTitles = 'Bold' | 'Italic' | 'Clear' | 'Link' | 'Undo' | 'Redo';

export interface RichTollbarButtonProps {
   title: RichToolbarButtonTitles;
   icon: ReactNode;
   command: () => void | string;
}

interface RichEditorToolbarProps {
   className?: string;
   selection?: Node;
}

export function createButton(
    title: string,
    content: ReactNode,
    command: ((selection: Node) => void) | string,
    selection?: Node,
) {
    let active = false;
    if (typeof command === 'string') {
        active = !!selection && document.queryCommandState(command);
    }

    const onAction = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (typeof command === 'function') {
            command(selection!);
        } else {
            document.execCommand(command);
        }
    };

    return (
        <Button
            className="rsw-btn"
            data-active={active}
            onMouseDown={onAction}
            tabIndex={-1}
            title={title}
        >
            {content}
        </Button>
    );
}

export const RichEditorToolbar = memo((props: RichEditorToolbarProps) => {
    const { className, selection } = props;

    return (
        <HStack className={classNames(cls.RichEditorToolbar, {}, [className])}>
            {createButton('Bold', '𝐁', 'bold', selection)}
            {createButton('Italic', '𝑰', 'italic', selection)}
            {createButton('Clear formatting', 'T̲ₓ', 'removeFormat')}
            {createButton('Link', '🔗', (selection) => {
                if (selection?.nodeName === 'A') {
                    document.execCommand('unlink');
                } else {
                // eslint-disable-next-line no-alert
                    document.execCommand('createLink', false, prompt('URL', '') || undefined);
                }
            }, selection)}
        </HStack>
    );
});
