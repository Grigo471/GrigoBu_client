import { type PropsWithChildren, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Page } from '@/widgets/Page';

interface ArticleEditPageProps {
   className?: string;
}

const ArticleEditPage = (props: PropsWithChildren<ArticleEditPageProps>) => {
    const { className } = props;
    const { t } = useTranslation();
    const { id } = useParams<{id:string}>();
    const isEdit = Boolean(id);

    return (
        <Page className={classNames('', {}, [className])}>
            {isEdit ? t('Редактирование статьи с ID = ') + id : t('Создание новой статьи')}
        </Page>
    );
};

export default memo(ArticleEditPage);
