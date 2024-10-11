import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { ArticleListItem } from './ArticleListItem';
import { Theme } from '@/shared/const/theme';

const meta: Meta<typeof ArticleListItem> = {
    title: 'shared/ArticleListItem',
    component: ArticleListItem,
    tags: ['autodocs'],
    argTypes: {
    },
};

export default meta;
type Story = StoryObj<typeof ArticleListItem>;

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
