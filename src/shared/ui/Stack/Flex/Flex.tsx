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
export type MbFlexGap = Exclude<FlexGap, '32' | '24' | '20'>;

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

const mbAlignClasses: Record<FlexAlign, string> = {
    start: cls.mbAlignStart,
    center: cls.mbAlignCenter,
    end: cls.mbAlignEnd,
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

const mbGapClasses: Record<MbFlexGap, string> = {
    4: cls.mbGap4,
    8: cls.mbGap8,
    12: cls.mbGap12,
    16: cls.mbGap16,
};

type DivProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export interface FlexProps extends DivProps {
   className?: string;
   justify?: FlexJustify;
   align?: FlexAlign;
   mbAlign?: FlexAlign;
   direction: FlexDirection;
   adaptive?: boolean;
   wrap?: FlexWrap;
   gap?: FlexGap;
   mbGap?: MbFlexGap;
   max?: boolean;
   children: ReactNode;
}

export const Flex = (props: FlexProps) => {
    const {
        className,
        children,
        justify = 'start',
        align = 'center',
        mbAlign = align,
        direction = 'row',
        adaptive = false,
        wrap = 'noWrap',
        gap,
        mbGap,
        max,
        ...otherProps
    } = props;

    const classes = [
        className,
        JustifyClasses[justify],
        AlignClasses[align],
        mbAlignClasses[mbAlign],
        DirectionClasses[direction],
        cls[wrap],
        gap && GapClasses[gap],
        mbGap && mbGapClasses[mbGap],
    ];

    const mods: Mods = {
        [cls.max]: max,
        [cls.adaptive]: adaptive,
    };

    return (
        <div className={classNames(cls.Flex, mods, classes)} {...otherProps}>
            {children}
        </div>
    );
};
