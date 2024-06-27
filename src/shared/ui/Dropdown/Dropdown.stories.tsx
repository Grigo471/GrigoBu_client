import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { Dropdown } from './Dropdown';
import { Button } from '../Button/Button';

const meta: Meta<typeof Dropdown> = {
    title: 'shared/Dropdown',
    component: Dropdown,
    tags: ['autodocs'],
    argTypes: {
    },
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

export const Light: Story = {
    args: {
        trigger: <Button>OPEN</Button>,
        items: [
            {
                content: 'first',
            },
            {
                content: 'second',
            },
            {
                content: 'third',
            },
        ],
    },
};

export const Dark: Story = {
    args: {
        trigger: <Button>OPEN</Button>,
        items: [
            {
                content: 'first',
            },
            {
                content: 'second',
            },
            {
                content: 'third',
            },
        ],
    },
    decorators: [
        ThemeDecorator(Theme.DARK),
    ],
};
