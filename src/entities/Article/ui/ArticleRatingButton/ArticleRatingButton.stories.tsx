import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { ArticleRatingButton } from './ArticleRatingButton';
import { Theme } from '@/shared/const/theme';

const meta: Meta<typeof ArticleRatingButton> = {
    title: 'shared/ArticleRatingButton',
    component: ArticleRatingButton,
    tags: ['autodocs'],
    argTypes: {
    },
};

export default meta;
type Story = StoryObj<typeof ArticleRatingButton>;

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
