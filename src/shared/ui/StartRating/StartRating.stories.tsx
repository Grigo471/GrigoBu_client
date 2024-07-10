import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { StartRating } from './StartRating';

const meta: Meta<typeof StartRating> = {
    title: 'shared/StartRating',
    component: StartRating,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof StartRating>;

export const Light: Story = {
    args: {
    },
};

export const LightSelected: Story = {
    args: {
        selectedStars: 3,
    },
};

export const Dark: Story = {
    args: {

    },
    decorators: [
        ThemeDecorator(Theme.DARK),
    ],
};
