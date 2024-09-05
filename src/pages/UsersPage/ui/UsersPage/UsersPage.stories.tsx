import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { UsersPage } from './UsersPage';
import { Theme } from '@/shared/const/theme';

const meta: Meta<typeof UsersPage> = {
    title: 'shared/UsersPage',
    component: UsersPage,
    tags: ['autodocs'],
    argTypes: {
    },
};

export default meta;
type Story = StoryObj<typeof UsersPage>;

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
