import { memo } from 'react';
import { Icon } from '@/shared/ui/Icon';
import CircleUpIcon from '@/shared/assets/icons/circle-up.svg';

interface ScrollToTopButtonProps {
    className?: string;
}

export const ScrollToTopButton = memo((props: ScrollToTopButtonProps) => {
    const { className } = props;

    const onClick = () => {
        window.scrollTo({ top: 0 });
    };

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
