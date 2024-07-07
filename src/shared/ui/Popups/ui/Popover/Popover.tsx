import { type PropsWithChildren, ReactNode, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Popover as HPopover } from '@headlessui/react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Popover.module.scss';
import { DropDownDirection } from '../../styles/consts';
import popupCls from '../../styles/popups.module.scss';

interface PopoverProps {
   className?: string;
   trigger: ReactNode;
   direction?: DropDownDirection;
   children?: ReactNode;
}

export const Popover = memo((props: PropsWithChildren<PopoverProps>) => {
    const {
        className, trigger, direction = 'bottomLeft', children,
    } = props;
    const { t } = useTranslation();

    const menuClasses = [popupCls[direction]];

    return (
        <HPopover className={classNames(cls.Popover, {}, [className, popupCls.popup])}>
            <HPopover.Button as="div" className={popupCls.trigger}>
                {trigger}
            </HPopover.Button>
            <HPopover.Panel className={classNames(cls.panel, {}, menuClasses)}>
                {children}
            </HPopover.Panel>
        </HPopover>
    );
});
