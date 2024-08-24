import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { RichTextEditor } from './RichTextEditor';
import { Theme } from '@/shared/const/theme';

const meta: Meta<typeof RichTextEditor> = {
    title: 'shared/RichTextEditor',
    component: RichTextEditor,
    tags: ['autodocs'],
    argTypes: {
    },
};

export default meta;
type Story = StoryObj<typeof RichTextEditor>;

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
