import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { AddArticleBlockDropdown } from './AddArticleBlockDropdown';
import { Theme } from '@/shared/const/theme';

const meta: Meta<typeof AddArticleBlockDropdown> = {
    title: 'shared/AddArticleBlockDropdown',
    component: AddArticleBlockDropdown,
    tags: ['autodocs'],
    argTypes: {
    },
};

export default meta;
type Story = StoryObj<typeof AddArticleBlockDropdown>;

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