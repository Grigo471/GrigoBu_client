import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Dropdown } from '@/shared/ui/redesigned/Popups';
import PlusIcon from '@/shared/assets/icons/plus.svg';
import { Icon } from '@/shared/ui/redesigned/Icon';
import cls from './AddArticleBlockDropdown.module.scss';

interface AddArticleBlockDropdownProps {
   className?: string;
   onAddArticleTextBlock: () => void;
   onAddArticleCodeBlock: () => void;
   onAddArticleImageBlock: () => void;
}

export const AddArticleBlockDropdown = memo((props: AddArticleBlockDropdownProps) => {
    const {
        className,
        onAddArticleTextBlock,
        onAddArticleCodeBlock,
        onAddArticleImageBlock,
    } = props;
    const { t } = useTranslation();

    const items = [
        {
            content: t('Текстовый блок'),
            onClick: onAddArticleTextBlock,
        },
        {
            content: t('Блок с картинкой'),
            onClick: onAddArticleImageBlock,
        },
        {
            content: t('Блок с кодом'),
            onClick: onAddArticleCodeBlock,
        },
    ];

    return (
        <Dropdown
            className={classNames('', {}, [className])}
            direction="bottomRight"
            items={items}
            trigger={<Icon className={cls.trigger} Svg={PlusIcon} />}
        />
    );
});
