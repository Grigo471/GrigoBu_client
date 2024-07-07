import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page/Page';
import { RatingCard } from '@/entities/Rating';

const MainPage = () => {
    const { t } = useTranslation('main');

    return (
        <Page>
            {t('Главная страница')}
            <RatingCard
                // eslint-disable-next-line i18next/no-literal-string
                title="Как Вам статья?"
                // eslint-disable-next-line i18next/no-literal-string
                feedbackTitle="Оставьте отзыв"
                hasFeedback
            />
        </Page>
    );
};

export default MainPage;
