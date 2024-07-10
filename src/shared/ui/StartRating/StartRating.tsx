import { memo, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './StartRating.module.scss';
import { Icon } from '../Icon/Icon';
import StarIcon from '@/shared/assets/icons/star.svg';

interface StartRatingProps {
   className?: string;
   onSelect?: (starsCount: number) => void;
   size?: number;
   selectedStars?: number;
}

const stars = [1, 2, 3, 4, 5];

export const StartRating = memo((props: StartRatingProps) => {
    const {
        className, size = 30, selectedStars = 0, onSelect,
    } = props;

    const [isSelected, setIsSelected] = useState(Boolean(selectedStars));
    const [currStarCounts, setCurrStarCounts] = useState(selectedStars);

    const onHover = (starsCount: number) => () => {
        if (!isSelected) {
            setCurrStarCounts(starsCount);
        }
    };

    const onLeave = () => {
        if (!isSelected) {
            setCurrStarCounts(0);
        }
    };

    const onClick = (starsCount: number) => () => {
        if (!isSelected) {
            onSelect?.(starsCount);
            setCurrStarCounts(starsCount);
            setIsSelected(true);
        }
    };

    return (
        <div className={classNames('', {}, [className])}>
            {stars.map((starNum) => (
                <Icon
                    className={classNames(
                        cls.starIcon,
                        {
                            [cls.hovered]: currStarCounts >= starNum,
                            [cls.selected]: isSelected,
                        },
                        [],
                    )}
                    Svg={StarIcon}
                    key={starNum}
                    width={size}
                    height={size}
                    onMouseLeave={onLeave}
                    onMouseEnter={onHover(starNum)}
                    onClick={onClick(starNum)}
                />
            ))}
        </div>
    );
});
