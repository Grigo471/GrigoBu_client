import { ReactElement } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './MainLayout.module.scss';

interface MainLayoutProps {
   className?: string;
   navbar: ReactElement;
   content: ReactElement;
   toolbar?: ReactElement;
}

export const MainLayout = (props: MainLayoutProps) => {
    const {
        className, navbar, content, toolbar,
    } = props;

    return (
        <>
            <div className={cls.navbar}>{navbar}</div>
            <div className={classNames(cls.MainLayout, {}, [className])}>
                <div className={cls.toolbar}>{toolbar}</div>
                <div className={cls.content}>{content}</div>
            </div>
        </>
    );
};
