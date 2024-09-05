import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { EditableArticleTextBlock } from './EditableArticleTextBlock';
import { Theme } from '@/shared/const/theme';

const meta: Meta<typeof EditableArticleTextBlock> = {
    title: 'shared/EditableArticleTextBlock',
    component: EditableArticleTextBlock,
    tags: ['autodocs'],
    argTypes: {
    },
};

export default meta;
type Story = StoryObj<typeof EditableArticleTextBlock>;

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
