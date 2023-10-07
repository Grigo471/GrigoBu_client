import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import ArticleEditPage from './ArticleEditPage';

const meta: Meta<typeof ArticleEditPage> = {
    title: 'shared/ArticleEditPage',
    component: ArticleEditPage,
    tags: ['autodocs'],
    argTypes: {
    },
};

export default meta;
type Story = StoryObj<typeof ArticleEditPage>;

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
