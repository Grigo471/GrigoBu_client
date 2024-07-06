import { type PropsWithChildren, ReactNode, memo } from 'react';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { useTheme } from 'app/providers/ThemeProvider';
import { useModal } from 'shared/lib/hooks/useModal';
import cls from './Drawer.module.scss';
import { Portal } from '../Portal/Portal';
import { Overlay } from '../Overlay/Overlay';

interface DrawerProps {
   className?: string;
   children: ReactNode;
   isOpen?: boolean;
   onClose?: () => void;
   lazy?: boolean;
}

export const Drawer = memo((props: PropsWithChildren<DrawerProps>) => {
    const {
        className, children, isOpen, onClose, lazy,
    } = props;

    const { theme } = useTheme();

    const {
        close,
        isClosing,
        isMounted,
        isOpening,
    } = useModal({
        animationDelay: 200,
        onClose,
        isOpen,
    });

    const mods: Mods = {
        [cls.opened]: isOpening,
        [cls.isClosing]: isClosing,
    };

    if (!isMounted && lazy) return null;

    return (
        <Portal>
            <div className={classNames(cls.Drawer, mods, [className, theme, 'app_drawer'])}>
                <Overlay onClick={close} />
                <div className={cls.content}>
                    {children}
                </div>
            </div>
        </Portal>
    );
});
