import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page';

export const ForbiddenPage = () => {
    const { t } = useTranslation('about');

    return (
        <Page>
            {t('У вас нет доступа к этой странице')}
        </Page>
    );
};
