import { memo, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './StartRating.module.scss';
import { Icon as IconDeprecated } from '../Icon/Icon';
import StarIcon from '@/shared/assets/icons/star.svg';
import { toggleFeatures, ToggleFeatures } from '@/shared/lib/features';
import { Icon } from '../../redesigned/Icon';

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
        <div className={classNames(toggleFeatures({
            name: 'isAppRedesigned',
            on: () => cls.StarRatingRedesigned,
            off: () => cls.StarRating,
        }), {}, [className])}
        >
            {stars.map((starNum) => {
                const commonProps = {
                    className: classNames(
                        cls.starIcon,
                        {
                            [cls.selected]: isSelected,
                        },
                        [currStarCounts >= starNum ? cls.hovered : cls.normal],
                    ),
                    Svg: StarIcon,
                    key: starNum,
                    width: size,
                    height: size,
                    onMouseLeave: onLeave,
                    onMouseEnter: onHover(starNum),
                    onClick: onClick(starNum),
                    'data-testid': `StarRating.${starNum}`,
                    'data-selected': currStarCounts >= starNum,
                };
                return (
                    <ToggleFeatures
                        feature="isAppRedesigned"
                        on={<Icon clickable={!isSelected} {...commonProps} />}
                        off={<IconDeprecated {...commonProps} />}
                    />
                );
            })}
        </div>
    );
});
