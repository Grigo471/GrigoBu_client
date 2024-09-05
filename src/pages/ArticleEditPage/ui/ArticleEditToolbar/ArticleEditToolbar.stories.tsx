import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { ArticleEditToolbar } from './ArticleEditToolbar';
import { Theme } from '@/shared/const/theme';

const meta: Meta<typeof ArticleEditToolbar> = {
    title: 'shared/ArticleEditToolbar',
    component: ArticleEditToolbar,
    tags: ['autodocs'],
    argTypes: {
    },
};

export default meta;
type Story = StoryObj<typeof ArticleEditToolbar>;

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
