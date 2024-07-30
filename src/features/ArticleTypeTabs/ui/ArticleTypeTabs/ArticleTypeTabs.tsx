import {
    type PropsWithChildren, memo, useMemo,
} from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { TabItem, Tabs as TabsDeprecated } from '@/shared/ui/deprecated/Tabs';
import { ArticleType } from '@/entities/Article';
import { ToggleFeatures } from '@/shared/lib/features';
import { Tabs } from '@/shared/ui/redesigned/Tabs';

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
        <ToggleFeatures
            feature="isAppRedesigned"
            on={(
                <Tabs<ArticleType>
                    direction="column"
                    tabs={typeTabs}
                    value={value}
                    onTabClick={onChangeType}
                    className={classNames('', {}, [className])}
                />
            )}
            off={(
                <TabsDeprecated<ArticleType>
                    tabs={typeTabs}
                    value={value}
                    onTabClick={onChangeType}
                    className={classNames('', {}, [className])}
                />
            )}
        />
    );
});
