import type { PropsWithChildren } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import './Loader.scss';

interface LoaderProps {
 className?: string;
}

export function Loader(props: PropsWithChildren<LoaderProps>) {
    const { className } = props;

    return (
        <div className={classNames('lds-ripple', {}, [className])}>
            <div />
            <div />
        </div>
    );
}
