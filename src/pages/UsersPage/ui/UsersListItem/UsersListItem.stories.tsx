import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { UsersListItem } from './UsersListItem';
import { Theme } from '@/shared/const/theme';

const meta: Meta<typeof UsersListItem> = {
    title: 'shared/UsersListItem',
    component: UsersListItem,
    tags: ['autodocs'],
    argTypes: {
    },
};

export default meta;
type Story = StoryObj<typeof UsersListItem>;

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
