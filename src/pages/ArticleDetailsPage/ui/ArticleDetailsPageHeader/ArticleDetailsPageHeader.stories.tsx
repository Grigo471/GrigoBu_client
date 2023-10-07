import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { ArticleDetailsPageHeader } from './ArticleDetailsPageHeader';

const meta: Meta<typeof ArticleDetailsPageHeader> = {
    title: 'shared/ArticleDetailsPageHeader',
    component: ArticleDetailsPageHeader,
    tags: ['autodocs'],
    argTypes: {
    },
};

export default meta;
type Story = StoryObj<typeof ArticleDetailsPageHeader>;

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
