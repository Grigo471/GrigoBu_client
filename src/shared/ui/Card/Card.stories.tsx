import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { Card } from './Card';
import { Text } from '../Text/Text';

const meta: Meta<typeof Card> = {
    title: 'shared/Card',
    component: Card,
    tags: ['autodocs'],
    argTypes: {
    },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Light: Story = {
    args: {
        children: <Text title="test" text="text" />,
    },
};

export const Dark: Story = {
    args: {
        children: <Text title="test" text="text" />,
    },
    decorators: [
        ThemeDecorator(Theme.DARK),
    ],
};
