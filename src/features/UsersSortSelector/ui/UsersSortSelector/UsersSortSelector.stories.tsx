import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { UsersSortSelector } from './UsersSortSelector';
import { Theme } from '@/shared/const/theme';

const meta: Meta<typeof UsersSortSelector> = {
    title: 'shared/UsersSortSelector',
    component: UsersSortSelector,
    tags: ['autodocs'],
    argTypes: {
    },
};

export default meta;
type Story = StoryObj<typeof UsersSortSelector>;

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
