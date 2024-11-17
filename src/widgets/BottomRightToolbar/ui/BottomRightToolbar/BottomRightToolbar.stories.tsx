import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { BottomRightToolbar } from './BottomRightToolbar';
import { Theme } from '@/shared/const/theme';

const meta: Meta<typeof BottomRightToolbar> = {
    title: 'shared/BottomRightToolbar',
    component: BottomRightToolbar,
    tags: ['autodocs'],
    argTypes: {
    },
};

export default meta;
type Story = StoryObj<typeof BottomRightToolbar>;

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
