import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { ArticleMyRateSelector } from './ArticleMyRateSelector';
import { Theme } from '@/shared/const/theme';

const meta: Meta<typeof ArticleMyRateSelector> = {
    title: 'shared/ArticleMyRateSelector',
    component: ArticleMyRateSelector,
    tags: ['autodocs'],
    argTypes: {
    },
};

export default meta;
type Story = StoryObj<typeof ArticleMyRateSelector>;

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
