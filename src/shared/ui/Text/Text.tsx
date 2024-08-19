import { memo, type PropsWithChildren } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Text.module.scss';

export type TextVariant = 'primary' | 'error' | 'accent';

export type TextAlign = 'right' | 'center' | 'left';

export type TextSize = 's' | 'm' | 'l';

export type TextWhiteSpace = 'preWrap' | 'normalWrap' | 'noWrap';

interface TextProps {
    className?: string;
    title?: string;
    text?: string;
    variant?: TextVariant;
    align?: TextAlign;
    size?: TextSize;
    bold?: boolean;
    whiteSpace?: TextWhiteSpace;

    'data-testid'?: string;
}

type HeaderTagType = 'h1' | 'h2' | 'h3';

const mapSizeToHeaderText: Record<TextSize, HeaderTagType> = {
    s: 'h3',
    m: 'h2',
    l: 'h1',
};

export const Text = memo((props: PropsWithChildren<TextProps>) => {
    const {
        className,
        title,
        text,
        variant = 'primary',
        align = 'left',
        size = 'm',
        bold = false,
        whiteSpace = 'normalWrap',

        'data-testid': dataTestId = 'Text',
    } = props;

    const HeaderTag = mapSizeToHeaderText[size];

    return (
        <div className={classNames(
            cls.Text,
            { [cls.bold]: bold },
            [className, cls[variant], cls[align], cls[size], cls[whiteSpace]],
        )}
        >
            {title && (
                <HeaderTag
                    className={cls.title}
                    data-testid={`${dataTestId}.Header`}
                >
                    {title}
                </HeaderTag>
            )}
            {text && (
                <p
                    className={cls.text}
                    data-testid={`${dataTestId}.Paragraph`}
                >
                    {text}
                </p>
            )}
        </div>
    );
});
