import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { RichTextOutput } from './RichTextOutput';
import { Theme } from '@/shared/const/theme';

const meta: Meta<typeof RichTextOutput> = {
    title: 'shared/RichTextOutput',
    component: RichTextOutput,
    tags: ['autodocs'],
    argTypes: {
    },
};

export default meta;
type Story = StoryObj<typeof RichTextOutput>;

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
