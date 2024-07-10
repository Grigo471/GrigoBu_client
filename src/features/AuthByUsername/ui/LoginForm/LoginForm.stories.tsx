import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import LoginForm from './LoginForm';
import { Theme } from '@/shared/const/theme';

const meta: Meta<typeof LoginForm> = {
    title: 'features/LoginForm',
    component: LoginForm,
    tags: ['autodocs'],
    decorators: [
        StoreDecorator({
            loginForm: { username: '123', password: '123' },
        }),
    ],
};

export default meta;
type Story = StoryObj<typeof LoginForm>;

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
            loginForm: { username: '123', password: '123', error: 'Error' },
        }),
    ],
};

export const Loading: Story = {
    args: {
        isOpen: true,
    },
    decorators: [
        StoreDecorator({
            loginForm: { username: '123', password: '123', isLoading: true },
        }),
    ],
};
