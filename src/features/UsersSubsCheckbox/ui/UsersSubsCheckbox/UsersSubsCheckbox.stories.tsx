import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { UsersSubsCheckbox } from './UsersSubsCheckbox';
import { Theme } from '@/shared/const/theme';

const meta: Meta<typeof UsersSubsCheckbox> = {
    title: 'shared/UsersSubsCheckbox',
    component: UsersSubsCheckbox,
    tags: ['autodocs'],
    argTypes: {
    },
};

export default meta;
type Story = StoryObj<typeof UsersSubsCheckbox>;

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
