import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { RichEditorContent } from './RichEditorContent';
import { Theme } from '@/shared/const/theme';

const meta: Meta<typeof RichEditorContent> = {
    title: 'shared/RichEditorContent',
    component: RichEditorContent,
    tags: ['autodocs'],
    argTypes: {
    },
};

export default meta;
type Story = StoryObj<typeof RichEditorContent>;

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
