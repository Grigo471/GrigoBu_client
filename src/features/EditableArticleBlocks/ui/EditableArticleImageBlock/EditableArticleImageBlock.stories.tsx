import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { EditableArticleImageBlock } from './EditableArticleImageBlock';
import { Theme } from '@/shared/const/theme';

const meta: Meta<typeof EditableArticleImageBlock> = {
    title: 'shared/EditableArticleImageBlock',
    component: EditableArticleImageBlock,
    tags: ['autodocs'],
    argTypes: {
    },
};

export default meta;
type Story = StoryObj<typeof EditableArticleImageBlock>;

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
