import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { ProfileCard } from './ProfileCard';
import { Theme } from '@/shared/const/theme';

const meta: Meta<typeof ProfileCard> = {
    title: 'shared/ProfileCard',
    component: ProfileCard,
    tags: ['autodocs'],
    argTypes: {
    },
};

export default meta;
type Story = StoryObj<typeof ProfileCard>;

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
