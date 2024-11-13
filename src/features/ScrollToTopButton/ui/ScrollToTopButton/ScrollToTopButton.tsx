import { memo, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { VirtuosoHandle } from 'react-virtuoso';
import { Icon } from '@/shared/ui/Icon';
import CircleUpIcon from '@/shared/assets/icons/circle-up.svg';

interface ScrollToTopButtonProps {
    className?: string;
}

export const ScrollToTopButton = memo((props: ScrollToTopButtonProps) => {
    const { className } = props;

    const { pathname } = useLocation();

    const onClick = useCallback(() => {
        const virtuoso = document.getElementById(`virtuoso ${pathname}`);
        console.log(virtuoso);
        if (virtuoso) virtuoso.scrollTo({ top: 0, behavior: 'smooth' });
    }, [pathname]);

    return (
        <Icon
            clickable
            onClick={onClick}
            Svg={CircleUpIcon}
            width={32}
            height={32}
            className={className}
        />
    );
});
