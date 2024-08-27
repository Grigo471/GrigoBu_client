import { type PropsWithChildren, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './RichTextOutput.module.scss';

interface RichTextOutputProps {
   className?: string;
   value?: string
}

export const RichTextOutput = memo((props: PropsWithChildren<RichTextOutputProps>) => {
    const { className, value = '' } = props;

    return (
        <div
            className={classNames(cls.RichTextOutput, {}, [className])}
            dangerouslySetInnerHTML={{ __html: value }}
        />
    );
});
