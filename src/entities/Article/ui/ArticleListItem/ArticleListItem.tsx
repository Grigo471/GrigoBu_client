import {
    type PropsWithChildren, memo, HTMLAttributeAnchorTarget,
} from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text } from 'shared/ui/Text/Text';
import { Icon } from 'shared/ui/Icon/Icon';
import EyeIcon from 'shared/assets/icons/eye.svg';
import { Card } from 'shared/ui/Card/Card';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from 'shared/config/routeConfig/routeConfig';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import cls from './ArticleListItem.module.scss';
import {
    Article, ArticleBlockType, ArticleTextBlock, ArticleView,
} from '../../model/types/article';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';

interface ArticleListItemProps {
   className?: string;
   article: Article;
   view: ArticleView;
   target?: HTMLAttributeAnchorTarget;
}

export const ArticleListItem = memo((props: PropsWithChildren<ArticleListItemProps>) => {
    const {
        className, article, view, target,
    } = props;
    const { t } = useTranslation('article');
    const navigate = useNavigate();

    const createdAt = <Text text={article.createdAt} className={cls.date} />;
    const image = <img src={article.img} className={cls.img} alt={article.title} />;
    const types = <Text text={article.type.join(', ')} className={cls.types} />;
    const views = (
        <>
            <Text text={String(article.views)} className={cls.views} />
            <Icon Svg={EyeIcon} />
        </>
    );

    if (view === ArticleView.BIG) {
        const textBlock = article.blocks.find(
            (block) => block.type === ArticleBlockType.TEXT,
        ) as ArticleTextBlock;

        return (
            <div className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}>
                <Card>
                    <div className={cls.header}>
                        <Avatar size={30} src={article.user.avatar} />
                        <Text text={article.user.username} className={cls.username} />
                        {createdAt}
                    </div>
                    <Text title={article.title} className={cls.title} />
                    {types}
                    {image}
                    {textBlock && (
                        <ArticleTextBlockComponent block={textBlock} className={cls.textBlock} />
                    )}
                    <div className={cls.footer}>
                        <AppLink target={target} to={RoutePaths.article_details + article.id}>
                            <Button
                                theme={ThemeButton.OUTLINE}
                            >
                                {t('Читать далее')}
                            </Button>
                        </AppLink>

                        {views}
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <AppLink
            target={target}
            to={RoutePaths.article_details + article.id}
        >
            <Card className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}>
                <div className={cls.imageWrapper}>
                    {image}
                    {createdAt}
                </div>
                <div className={cls.infoWrapper}>
                    {types}
                    {views}
                </div>
                <Text text={article.title} className={cls.title} />
            </Card>
        </AppLink>
    );
});
