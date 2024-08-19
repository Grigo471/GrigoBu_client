import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Icon.module.scss';

type SVGProps = Omit<React.SVGProps<SVGSVGElement>, 'onClick'>;

interface IconBaseProps extends SVGProps {
   className?: string;
   Svg: React.VFC<React.SVGProps<SVGSVGElement>>;
}

interface NonClickableIconProps extends IconBaseProps {
    clickable?: false;
}

interface ClickableIconProps extends IconBaseProps {
    clickable: true;
    onClick: () => void;
}

type IconProps = ClickableIconProps | NonClickableIconProps;

export const Icon = memo((props: IconProps) => {
    const {
        className, Svg, width = 32, height = 32, clickable, ...otherProps
    } = props;

    const icon = (
        <Svg
            {...otherProps}
            onClick={undefined}
            width={width}
            height={height}
            className={classNames(cls.Icon, {}, [className])}
        />
    );

    if (clickable) {
        return (
            <button
                type="button"
                className={cls.button}
                onClick={props.onClick}
                style={{ height, width }}
            >
                {icon}
            </button>
        );
    }

    return icon;
});
