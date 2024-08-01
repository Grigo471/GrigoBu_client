import type { Meta, StoryObj } from '@storybook/react';

import { UIDesignSwitcher } from './UIDesignSwitcher';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

const meta: Meta<typeof UIDesignSwitcher> = {
    title: 'features/UIDesignSwitcher',
    component: UIDesignSwitcher,
    tags: ['autodocs'],
    argTypes: {
    },
};

export default meta;
type Story = StoryObj<typeof UIDesignSwitcher>;

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
