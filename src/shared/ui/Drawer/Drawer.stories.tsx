import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/app/providers/ThemeProvider';
import { Drawer } from './Drawer';

const child = (<div>Hello there</div>);

const meta: Meta<typeof Drawer> = {
    title: 'shared/Drawer',
    component: Drawer,
    tags: ['autodocs'],
    args: {
        children: [
            child,
            child,
            child,
        ],
        isOpen: true,
    },
};

export default meta;
type Story = StoryObj<typeof Drawer>;

export const Light: Story = {
    args: {

    },
};

export const Dark: Story = {
    args: {

    },
    decorators: [
        ThemeDecorator(Theme.DARK),
    ],
};
