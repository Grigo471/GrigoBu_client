import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { EditableAvatar } from './EditableAvatar';
import { Theme } from '@/shared/const/theme';

const meta: Meta<typeof EditableAvatar> = {
    title: 'shared/EditableAvatar',
    component: EditableAvatar,
    tags: ['autodocs'],
    argTypes: {
    },
};

export default meta;
type Story = StoryObj<typeof EditableAvatar>;

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
