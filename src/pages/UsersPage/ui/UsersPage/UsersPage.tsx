import { type PropsWithChildren, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './UsersPage.module.scss';

interface UsersPageProps {
   className?: string;
}

export const UsersPage = memo((props: PropsWithChildren<UsersPageProps>) => {
    const { className } = props;
    const { t } = useTranslation();

    return (
        <div className={classNames(cls.UsersPage, {}, [className])}>
            {t('Список пользователей')}
        </div>
    );
});
