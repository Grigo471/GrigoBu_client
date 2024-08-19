import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { Popover } from './Popover';

const child = (<div>Hello there</div>);

const meta: Meta<typeof Popover> = {
    title: 'shared/redesigned/Popover',
    component: Popover,
    tags: ['autodocs'],
    args: {
        children: [
            child,
            child,
            child,
        ],
        trigger: (<div>Press me</div>),
        direction: 'bottomRight',
    },
};

export default meta;
type Story = StoryObj<typeof Popover>;

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
