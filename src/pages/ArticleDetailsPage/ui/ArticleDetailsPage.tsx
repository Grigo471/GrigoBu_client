import { memo, type PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticleDetailsPage.module.scss';

interface ArticleDetailsPageProps {
   className?: string;
}

const ArticleDetailsPage = (props: PropsWithChildren<ArticleDetailsPageProps>) => {
    const { className } = props;
    const { t } = useTranslation('article');

    return (
        <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
            {t('ARTICLE DETAILS')}
        </div>
    );
};

export default memo(ArticleDetailsPage);
