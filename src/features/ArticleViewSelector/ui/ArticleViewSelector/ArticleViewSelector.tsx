import { type PropsWithChildren, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import ListIconDeprecated from '@/shared/assets/icons/list-old.svg';
import TileIconDeprecated from '@/shared/assets/icons/tile-old.svg';
import TileIcon from '@/shared/assets/icons/tile.svg';
import ListIcon from '@/shared/assets/icons/burger.svg';
import { Button as ButtonDeprecated, ThemeButton } from '@/shared/ui/deprecated/Button';
import { Icon as Icondeprecated } from '@/shared/ui/deprecated/Icon';
import cls from './ArticleViewSelector.module.scss';
import { ArticleView } from '@/entities/Article';
import { ToggleFeatures, toggleFeatures } from '@/shared/lib/features';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Card } from '@/shared/ui/redesigned/Card';
import { HStack } from '@/shared/ui/Stack';

interface ArticleViewSelectorProps {
    className?: string;
    view?: ArticleView;
    onViewClick?: (view: ArticleView) => void;
}

const viewTypes = [
    {
        view: ArticleView.SMALL,
        icon: toggleFeatures({
            name: 'isAppRedesigned',
            on: () => TileIcon,
            off: () => TileIconDeprecated,
        }),
    },
    {
        view: ArticleView.BIG,
        icon: toggleFeatures({
            name: 'isAppRedesigned',
            on: () => ListIcon,
            off: () => ListIconDeprecated,
        }),
    },
];

export const ArticleViewSelector = memo((props: PropsWithChildren<ArticleViewSelectorProps>) => {
    const { className, view, onViewClick } = props;
    const { t } = useTranslation();

    const onClick = (newView: ArticleView) => () => {
        onViewClick?.(newView);
    };

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={(
                <Card
                    border="round"
                    className={classNames(cls.ArticleViewSelectorRedesigned, {}, [className])}
                >
                    <HStack gap="8">
                        {viewTypes.map((viewType) => (
                            <Icon
                                clickable
                                onClick={onClick(viewType.view)}
                                Svg={viewType.icon}
                                key={viewType.view}
                                className={
                                    classNames(
                                        '',
                                        { [cls.notSelected]: viewType.view !== view },
                                        [],
                                    )
                                }
                            />
                        ))}
                    </HStack>
                </Card>
            )}
            off={(
                <div className={classNames(cls.ArticleViewSelector, {}, [className])}>
                    {viewTypes.map((viewType) => (
                        <ButtonDeprecated
                            theme={ThemeButton.CLEAR}
                            onClick={onClick(viewType.view)}
                            key={viewType.view}
                        >
                            <Icondeprecated
                                width={24}
                                height={24}
                                Svg={viewType.icon}
                                className={
                                    classNames(
                                        '',
                                        { [cls.notSelected]: viewType.view !== view },
                                        [],
                                    )
                                }
                            />
                        </ButtonDeprecated>
                    ))}
                </div>
            )}
        />
    );
});
