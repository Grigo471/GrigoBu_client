import { type PropsWithChildren, memo, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Code.module.scss';
import CopyIcon from '../../assets/icons/copy.svg';
import { Icon } from '../Icon';

interface CodeProps {
   className?: string;
   text: string;
}

export const Code = memo((props: PropsWithChildren<CodeProps>) => {
    const { className, text } = props;

    const onCopy = useCallback(() => {
        navigator.clipboard.writeText(text);
    }, [text]);

    return (
        <pre className={classNames(cls.Code, {}, [className])}>
            <Icon
                clickable
                onClick={onCopy}
                className={cls.copyBtn}
                Svg={CopyIcon}
            />
            <code>
                {text}
            </code>
        </pre>
    );
});
