import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { SubmitModal } from './SubmitModal';
import { Theme } from '@/shared/const/theme';

const meta: Meta<typeof SubmitModal> = {
    title: 'shared/SubmitModal',
    component: SubmitModal,
    tags: ['autodocs'],
    argTypes: {
    },
};

export default meta;
type Story = StoryObj<typeof SubmitModal>;

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
