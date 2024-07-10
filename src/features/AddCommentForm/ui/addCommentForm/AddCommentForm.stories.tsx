import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import AddCommentForm from './AddCommentForm';
import { Theme } from '@/shared/const/theme';

const meta: Meta<typeof AddCommentForm> = {
    title: 'features/addCommentForm',
    component: AddCommentForm,
    tags: ['autodocs'],
    argTypes: {
    },
    decorators: [
        StoreDecorator({ }),
    ],
};

export default meta;
type Story = StoryObj<typeof AddCommentForm>;

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
