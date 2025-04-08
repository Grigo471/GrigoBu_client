import {
    memo, SVGProps, useCallback, VFC,
} from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Dropdown } from '@/shared/ui/Popups';
import PlusIcon from '@/shared/assets/icons/plus.svg';
import { Icon } from '@/shared/ui/Icon';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { articleEditPageActions } from '../../model/slice/ArticleEditPageSlice';
import { ArticleBlockType } from '@/entities/Article';
import { HStack } from '@/shared/ui/Stack';
import TextIcon from '@/shared/assets/icons/article.svg';
import PhotoIcon from '@/shared/assets/icons/photo.svg';
import CodeIcon from '@/shared/assets/icons/code.svg';
import cls from './AddArticleBlockDropdown.module.scss';

interface AddArticleBlockDropdownProps {
   className?: string;
}

export const AddArticleBlockDropdown = memo((props: AddArticleBlockDropdownProps) => {
    const {
        className,
    } = props;
    const { t } = useTranslation('article-edit');
    const dispatch = useAppDispatch();

    const onAddArticleBlock = useCallback((blockType: ArticleBlockType) => {
        dispatch(articleEditPageActions.addArticleBlock(blockType));
    }, [dispatch]);

    const itemContent = (text: string, icon: VFC<SVGProps<SVGSVGElement>>) => (
        <HStack gap="8">
            <Icon Svg={icon} height={24} />
            {text}
        </HStack>
    );

    const items = [
        {
            content: itemContent(t('Текстовый блок'), TextIcon),
            onClick: () => onAddArticleBlock('text'),
        },
        {
            content: itemContent(t('Блок с картинкой'), PhotoIcon),
            onClick: () => onAddArticleBlock('image'),
        },
        {
            content: itemContent(t('Блок с кодом'), CodeIcon),
            onClick: () => onAddArticleBlock('code'),
        },
    ];

    return (
        <Dropdown
            className={classNames(cls.AddArticleBlockDropdown, {}, [className])}
            direction="bottomRight"
            items={items}
            trigger={(
                <Icon
                    Svg={PlusIcon}
                    className={cls.trigger}
                />
            )}
        />

    );
});
