import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { Button, ThemeButton } from './Button';

const meta: Meta<typeof Button> = {
    title: 'shared/Button',
    component: Button,
    decorators: [ThemeDecorator(Theme.LIGHT)],
    tags: ['autodocs'],
    parameters: {
        themes: [
            { name: 'primary', class: 'primary', color: 'grey' },
            { name: 'clear', class: 'clear', color: 'white' },
            { name: 'outline', class: 'outline', color: 'black' },
        ],
    },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Light: Story = {
    args: {
        children: 'TEXT',
    },
};

export const Dark: Story = {
    args: {
        theme: ThemeButton.OUTLINE,
        children: 'TEXT',
    },
    decorators: [
        ThemeDecorator(Theme.DARK),
    ],
};
