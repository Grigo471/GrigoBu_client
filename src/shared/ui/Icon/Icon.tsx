import { type PropsWithChildren, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Icon.module.scss';

interface IconProps extends React.SVGProps<SVGSVGElement> {
   className?: string;
   Svg: React.VFC<React.SVGProps<SVGSVGElement>>;
   inverted?: boolean;
}

export const Icon = memo((props: PropsWithChildren<IconProps>) => {
    const {
        className, Svg, inverted, ...otherProps
    } = props;

    return (
        <Svg
            {...otherProps}
            className={classNames(inverted ? cls.inverted : cls.Icon, {}, [className])}
        />
    );
});
