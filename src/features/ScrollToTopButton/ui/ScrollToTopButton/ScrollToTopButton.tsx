import { memo, useCallback } from 'react';
import { Icon } from '@/shared/ui/Icon';
import CircleUpIcon from '@/shared/assets/icons/circle-up.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ScrollToTopButton.module.scss';

interface ScrollToTopButtonProps {
    className?: string;
}

export const ScrollToTopButton = memo((props: ScrollToTopButtonProps) => {
    const { className } = props;

    const onClick = useCallback(() => {
        window.scrollTo({ top: 0 });
    }, []);

    return (
        <div
            className={classNames(cls.ScrollToTopButton, {}, [className])}
            onClick={onClick}
        >
            <Icon
                Svg={CircleUpIcon}
                width={32}
                height={32}
            />
        </div>
    );
});
