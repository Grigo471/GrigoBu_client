import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { ArticleTypeTabs } from './ArticleTypeTabs';
import { Theme } from '@/shared/const/theme';
import { ArticleType } from '@/entities/Article';

const meta: Meta<typeof ArticleTypeTabs> = {
    title: 'entities/Article/ArticleTypeTabs',
    component: ArticleTypeTabs,
    tags: ['autodocs'],
    argTypes: {
    },
};

export default meta;
type Story = StoryObj<typeof ArticleTypeTabs>;

export const Light: Story = {
    args: {
        value: ArticleType.ALL,
        onChangeType: () => { },
    },
};

export const Dark: Story = {
    args: {
        value: ArticleType.ALL,
        onChangeType: () => { },
    },
    decorators: [
        ThemeDecorator(Theme.DARK),
    ],
};
