import { classNames } from 'shared/lib/classNames/classNames';
import type { PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './NotFoundPage.module.scss';

interface NotFoundPageProps {
 className?: string;
}

export function NotFoundPage(props: PropsWithChildren<NotFoundPageProps>) {
    const { className } = props;

    const { t } = useTranslation();

    return (
        <div className={classNames(cls.NotFoundPage, {}, [className])}>
            {t('Страница не найдена')}
        </div>
    );
}
