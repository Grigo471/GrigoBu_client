import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { AppLink } from './AppLink';

const meta: Meta<typeof AppLink> = {
    title: 'shared/AppLink',
    component: AppLink,
    tags: ['autodocs'],
    args: {
        to: '/',
    },
    parameters: {
        themes: [
            { name: 'primary', class: 'primary', color: 'grey' },
            { name: 'secondary', class: 'secondary', color: 'white' },
        ],
    },
};

export default meta;
type Story = StoryObj<typeof AppLink>;

export const Light: Story = {
    args: {
        children: 'TEXT',
    },
};

export const Dark: Story = {
    args: {
        children: 'TEXT',
    },
    decorators: [
        ThemeDecorator(Theme.DARK),
    ],
};
