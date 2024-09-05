import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { ArticleEditForm } from './ArticleEditForm';
import { Theme } from '@/shared/const/theme';

const meta: Meta<typeof ArticleEditForm> = {
    title: 'shared/ArticleEditForm',
    component: ArticleEditForm,
    tags: ['autodocs'],
    argTypes: {
    },
};

export default meta;
type Story = StoryObj<typeof ArticleEditForm>;

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
