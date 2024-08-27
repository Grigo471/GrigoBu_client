import { ReactElement } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './MainLayout.module.scss';

interface MainLayoutProps {
   className?: string;
   navbar: ReactElement;
   content: ReactElement;
   leftbar?: ReactElement;
}

export const MainLayout = (props: MainLayoutProps) => {
    const {
        className, navbar, content, leftbar,
    } = props;

    return (
        <div className={classNames(cls.MainLayout, {}, [className])}>
            <div className={cls.navbar}>{navbar}</div>
            <div className={cls.contentWrapper}>
                <div className={cls.content}>{content}</div>
                <div className={cls.leftbar}>{leftbar}</div>
            </div>
        </div>
    );
};
