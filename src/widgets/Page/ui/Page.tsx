import {
    type PropsWithChildren,
    memo,
} from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Page.module.scss';
import { TestProps } from '@/shared/types/tests';

interface PageProps extends TestProps {
   className?: string;
}

export const Page = memo((props: PropsWithChildren<PageProps>) => {
    const { className, children } = props;

    return (
        <main
            className={classNames(cls.PageRedesigned, {}, [className])}
            data-testid={props['data-testid'] ?? 'Page'}
        >
            {children}
            {/* <div className={cls.footer} /> */}
        </main>
    );
});
