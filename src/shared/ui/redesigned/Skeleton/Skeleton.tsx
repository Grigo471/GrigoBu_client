import { type PropsWithChildren, memo, CSSProperties } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Skeleton.module.scss';

interface SkeletonProps {
   className?: string;
   height?: string | number;
   width?: string | number;
   border?: string;
}

export const Skeleton = memo((props: PropsWithChildren<SkeletonProps>) => {
    const {
        className,
        height,
        width,
        border,
    } = props;

    const styles: CSSProperties = {
        width,
        height,
        borderRadius: border,
    };

    return (
        <div
            className={classNames(cls.Skeleton, {}, [className])}
            style={styles}
        />
    );
});
