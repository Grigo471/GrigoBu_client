import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { EditableArticleCodeBlock } from './EditableArticleCodeBlock';
import { Theme } from '@/shared/const/theme';

const meta: Meta<typeof EditableArticleCodeBlock> = {
    title: 'shared/EditableArticleCodeBlock',
    component: EditableArticleCodeBlock,
    tags: ['autodocs'],
    argTypes: {
    },
};

export default meta;
type Story = StoryObj<typeof EditableArticleCodeBlock>;

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
