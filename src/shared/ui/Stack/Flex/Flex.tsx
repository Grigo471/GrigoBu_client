import {
    DetailedHTMLProps, HTMLAttributes,
    ReactNode,
} from 'react';
import { Mods, classNames } from '@/shared/lib/classNames/classNames';
import cls from './Flex.module.scss';

export type FlexJustify = 'start' | 'center' | 'end' | 'between';
export type FlexAlign = 'start' | 'center' | 'end';
export type FlexDirection = 'row' | 'column';
export type FlexWrap = 'noWrap' | 'wrap';
export type FlexGap = '4' | '8' | '12' | '16' | '20' | '24' | '32';

const JustifyClasses: Record<FlexJustify, string> = {
    start: cls.justifyStart,
    center: cls.justifyCenter,
    end: cls.justifyEnd,
    between: cls.justifyBetween,
};

const AlignClasses: Record<FlexAlign, string> = {
    start: cls.alignStart,
    center: cls.alignCenter,
    end: cls.alignEnd,
};

const DirectionClasses: Record<FlexDirection, string> = {
    row: cls.directionRow,
    column: cls.directionColumn,
};

const GapClasses: Record<FlexGap, string> = {
    4: cls.gap4,
    8: cls.gap8,
    12: cls.gap12,
    16: cls.gap16,
    20: cls.gap20,
    24: cls.gap24,
    32: cls.gap32,
};

type DivProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export interface FlexProps extends DivProps {
   className?: string;
   justify?: FlexJustify;
   align?: FlexAlign;
   direction: FlexDirection;
   wrap?: FlexWrap;
   gap?: FlexGap;
   max?: boolean;
   children: ReactNode;
}

export const Flex = (props: FlexProps) => {
    const {
        className,
        children,
        justify = 'start',
        align = 'center',
        direction = 'row',
        wrap = 'noWrap',
        gap,
        max,
        ...otherProps
    } = props;

    const classes = [
        className,
        JustifyClasses[justify],
        AlignClasses[align],
        DirectionClasses[direction],
        cls[wrap],
        gap && GapClasses[gap],
    ];

    const mods: Mods = {
        [cls.max]: max,
    };

    return (
        <div className={classNames(cls.Flex, mods, classes)} {...otherProps}>
            {children}
        </div>
    );
};
