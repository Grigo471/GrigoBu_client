import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { AppLoaderLayout } from './AppLoaderLayout';
import { Theme } from '@/shared/const/theme';

const meta: Meta<typeof AppLoaderLayout> = {
    title: 'shared/AppLoaderLayout',
    component: AppLoaderLayout,
    tags: ['autodocs'],
    argTypes: {
    },
};

export default meta;
type Story = StoryObj<typeof AppLoaderLayout>;

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
