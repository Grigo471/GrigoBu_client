import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { RichEditorToolbar } from './RichEditorToolbar';
import { Theme } from '@/shared/const/theme';

const meta: Meta<typeof RichEditorToolbar> = {
    title: 'shared/RichEditorToolbar',
    component: RichEditorToolbar,
    tags: ['autodocs'],
    argTypes: {
    },
};

export default meta;
type Story = StoryObj<typeof RichEditorToolbar>;

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
