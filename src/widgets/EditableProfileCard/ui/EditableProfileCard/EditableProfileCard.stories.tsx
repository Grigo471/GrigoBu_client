import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { EditableProfileCard } from './EditableProfileCard';
import { Theme } from '@/shared/const/theme';

const meta: Meta<typeof EditableProfileCard> = {
    title: 'shared/EditableProfileCard',
    component: EditableProfileCard,
    tags: ['autodocs'],
    argTypes: {
    },
};

export default meta;
type Story = StoryObj<typeof EditableProfileCard>;

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
