import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
    title: 'shared/redesigned/Input',
    component: Input,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Primary: Story = {
    args: {
        placeholder: 'Type text',
        value: '123',
    },
};

export const Dark: Story = {
    args: {
        placeholder: 'Type text',
        value: '123',
    },
    decorators: [
        ThemeDecorator(Theme.DARK),
    ],
};
