import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { ScrollToolbar } from './ScrollToolbar';
import { Theme } from '@/shared/const/theme';

const meta: Meta<typeof ScrollToolbar> = {
    title: 'shared/ScrollToolbar',
    component: ScrollToolbar,
    tags: ['autodocs'],
    argTypes: {
    },
};

export default meta;
type Story = StoryObj<typeof ScrollToolbar>;

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
