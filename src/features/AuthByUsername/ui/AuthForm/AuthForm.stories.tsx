import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import AuthForm from './AuthForm';
import { Theme } from '@/shared/const/theme';

const meta: Meta<typeof AuthForm> = {
    title: 'features/LoginForm',
    component: AuthForm,
    tags: ['autodocs'],
    decorators: [
        StoreDecorator({
            authForm: { username: '123', password: '123' },
        }),
    ],
};

export default meta;
type Story = StoryObj<typeof AuthForm>;

export const Primary: Story = {
    args: {
        isOpen: true,
    },
};

export const Dark: Story = {
    args: {
        isOpen: true,
    },
    decorators: [
        ThemeDecorator(Theme.DARK),
    ],
};

export const WithError: Story = {
    args: {
        isOpen: true,
    },
    decorators: [
        StoreDecorator({
            authForm: { username: '123', password: '123', apiError: 'Unforseen error' },
        }),
    ],
};

export const Loading: Story = {
    args: {
        isOpen: true,
    },
    decorators: [
        StoreDecorator({
            authForm: { username: '123', password: '123', isLoading: true },
        }),
    ],
};
