import {
    type PropsWithChildren, memo, useMemo,
} from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ArticleType } from '@/entities/Article';
import { TabItem, Tabs } from '@/shared/ui/Tabs';

interface ArticleTypeTabsProps {
    className?: string;
    value: ArticleType;
    onChangeType: (tab: TabItem<ArticleType>) => void;
}

export const ArticleTypeTabs = memo((props: PropsWithChildren<ArticleTypeTabsProps>) => {
    const { className, value, onChangeType } = props;
    const { t } = useTranslation('article');

    const typeTabs = useMemo<TabItem<ArticleType>[]>(() => Object.values(
        ArticleType,
    ).reduce((acc: TabItem<ArticleType>[], cur) => ([
        ...acc,
        { value: cur, content: t(cur) },
    ]), []), [t]);

    return (

        <Tabs<ArticleType>
            direction="column"
            tabs={typeTabs}
            value={value}
            onTabClick={onChangeType}
            className={classNames('', {}, [className])}
        />

    );
});
