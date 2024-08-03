import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page';
import { RatingCard } from '@/entities/Rating';
import { Counter } from '@/entities/Counter';

const MainPage = () => {
    const { t } = useTranslation('main');

    return (
        <Page data-testid="MainPage">
            {t('Главная страница')}
            <Counter />
            <RatingCard
                // eslint-disable-next-line i18next/no-literal-string
                title="Как Вам статья?"
                // eslint-disable-next-line i18next/no-literal-string
                feedbackTitle="Оставьте отзыв"
            />
        </Page>
    );
};

export default MainPage;
