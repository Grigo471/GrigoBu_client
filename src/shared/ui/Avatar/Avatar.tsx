import {
    useMemo, type PropsWithChildren, CSSProperties,
} from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Avatar.module.scss';
import { AppImage } from '../AppImage';
import DefaultAvatar from '../../assets/png/defaultAvatar.png';
import { Skeleton } from '../Skeleton';

interface AvatarProps {
  className?: string;
  src?: string;
  size?: number;
  alt?: string;
}

export const Avatar = (
    props: PropsWithChildren<AvatarProps>,
) => {
    const {
        className, src, size = 100, alt,
    } = props;

    const styles = useMemo<CSSProperties>(() => ({
        width: size,
        height: size,
    }), [size]);

    const fallback = <Skeleton width={size} height={size} border="50%" />;
    // const errorFallback = (
    //     <Icon
    //         Svg={DefaultAvatar}
    //         width={size}
    //         height={size}
    //         className={className}
    //     />
    // );

    if (!src) {
        return (
            <AppImage
                src={DefaultAvatar}
                style={styles}
                className={classNames(cls.Avatar, {}, [className, cls.DefaultAvatar])}
                alt={alt}
                fallback={fallback}
            />
        );
    }

    return (
        <div style={styles}>
            <AppImage
                src={src}
                style={styles}
                className={classNames(cls.Avatar, {}, [className])}
                alt={alt}
                errorFallback={fallback}
                fallback={fallback}
            />
        </div>

    );
};
