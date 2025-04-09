import {
    type PropsWithChildren, memo, useState,
} from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Code.module.scss';
import CopyIcon from '../../assets/icons/copy.svg';
import DoneIcon from '../../assets/icons/done.svg';
import { Icon } from '../Icon';

interface CodeProps {
   className?: string;
   text: string;
}

export const Code = memo((props: PropsWithChildren<CodeProps>) => {
    const { className, text } = props;

    const [copied, setCopied] = useState(false);

    const onCopy = () => {
        navigator.clipboard.writeText(text).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        });
    };

    return (
        <div className={classNames(cls.codeWrapper, {}, [className])}>
            <pre className={cls.Code}>
                {copied
                    ? <Icon Svg={DoneIcon} width={16} className={cls.copyBtn} />
                    : (
                        <Icon
                            clickable
                            onClick={onCopy}
                            className={cls.copyBtn}
                            Svg={CopyIcon}
                        />
                    )}
                <code>
                    {text}
                </code>
            </pre>
        </div>

    );
});
