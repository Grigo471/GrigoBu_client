import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { ProfileCardRedesigned } from './ProfileCardRedesigned';
import { Theme } from '@/shared/const/theme';

const meta: Meta<typeof ProfileCardRedesigned> = {
    title: 'shared/ProfileCardRedesigned',
    component: ProfileCardRedesigned,
    tags: ['autodocs'],
    argTypes: {
    },
};

export default meta;
type Story = StoryObj<typeof ProfileCardRedesigned>;

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
