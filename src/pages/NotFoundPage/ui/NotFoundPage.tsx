import type { PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Page } from '@/widgets/Page';
import cls from './NotFoundPage.module.scss';

interface NotFoundPageProps {
 className?: string;
}

export function NotFoundPage(props: PropsWithChildren<NotFoundPageProps>) {
    const { className } = props;

    const { t } = useTranslation();

    return (
        <Page
            data-testid="NotFoundPage"
            className={classNames(cls.NotFoundPage, {}, [className])}
        >
            {t('Страница не найдена')}
        </Page>
    );
}
