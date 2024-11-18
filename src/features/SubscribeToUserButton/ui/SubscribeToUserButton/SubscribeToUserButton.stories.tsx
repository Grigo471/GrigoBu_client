import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { SubscribeToUserButton } from './SubscribeToUserButton';
import { Theme } from '@/shared/const/theme';

const meta: Meta<typeof SubscribeToUserButton> = {
    title: 'shared/SubscribeToUserButton',
    component: SubscribeToUserButton,
    tags: ['autodocs'],
    argTypes: {
    },
};

export default meta;
type Story = StoryObj<typeof SubscribeToUserButton>;

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
