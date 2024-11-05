import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { ArticlesPageLayout } from './ArticlesPageLayout';
import { Theme } from '@/shared/const/theme';

const meta: Meta<typeof ArticlesPageLayout> = {
    title: 'shared/ArticlesPageLayout',
    component: ArticlesPageLayout,
    tags: ['autodocs'],
    argTypes: {
    },
};

export default meta;
type Story = StoryObj<typeof ArticlesPageLayout>;

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
