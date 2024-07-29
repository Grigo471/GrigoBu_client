import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { Button, ButtonSize, ThemeButton } from './Button';

const meta: Meta<typeof Button> = {
    title: 'shared/Button',
    component: Button,
    decorators: [ThemeDecorator(Theme.LIGHT)],
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
    args: {
        children: 'Text',
    },
};

export const Clear: Story = {
    args: {
        children: 'Text',
        theme: ThemeButton.CLEAR,
    },
};

export const ClearInverted: Story = {
    args: {
        children: 'Text',
        theme: ThemeButton.CLEAR_INVERTED,
    },
};

export const Outline: Story = {
    args: {
        theme: ThemeButton.OUTLINE,
        children: 'Text',
    },
};

export const OutlineSizeL: Story = {
    args: {
        theme: ThemeButton.OUTLINE,
        children: 'Text',
        size: ButtonSize.L,
    },
};

export const OutlineSizeXL: Story = {
    args: {
        theme: ThemeButton.OUTLINE,
        children: 'Text',
        size: ButtonSize.XL,
    },
};

export const OutlineDark: Story = {
    args: {
        theme: ThemeButton.OUTLINE,
        children: 'Text',
    },
    decorators: [
        ThemeDecorator(Theme.DARK),
    ],
};

export const Background: Story = {
    args: {
        theme: ThemeButton.BACKGROUND,
        children: 'Text',
    },
};

export const BackgroundInverted: Story = {
    args: {
        theme: ThemeButton.BACKGROUND_INVERTED,
        children: 'Text',
    },
};

export const Square: Story = {
    args: {
        theme: ThemeButton.BACKGROUND_INVERTED,
        children: '>',
        square: true,
        size: ButtonSize.M,
    },
};

export const SquareSizeL: Story = {
    args: {
        theme: ThemeButton.BACKGROUND_INVERTED,
        children: '>',
        square: true,
        size: ButtonSize.L,
    },
};

export const SquareSizeXL: Story = {
    args: {
        theme: ThemeButton.BACKGROUND_INVERTED,
        children: '>',
        square: true,
        size: ButtonSize.XL,
    },
};

export const Disabled: Story = {
    args: {
        theme: ThemeButton.OUTLINE,
        children: 'Text',
        disabled: true,
    },
};
