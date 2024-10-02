import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { ArticleTagsSelector } from './ArticleTagsSelector';
import { Theme } from '@/shared/const/theme';

const meta: Meta<typeof ArticleTagsSelector> = {
    title: 'shared/ArticleTagsSelector',
    component: ArticleTagsSelector,
    tags: ['autodocs'],
    argTypes: {
    },
};

export default meta;
type Story = StoryObj<typeof ArticleTagsSelector>;

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
