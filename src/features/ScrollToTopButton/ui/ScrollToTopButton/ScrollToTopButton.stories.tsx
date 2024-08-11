import type { Meta, StoryObj } from '@storybook/react';
import { ScrollToTopButton } from './ScrollToTopButton';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

const meta: Meta<typeof ScrollToTopButton> = {
    title: 'features/ScrollToTopButton',
    component: ScrollToTopButton,
    tags: ['autodocs'],
    argTypes: {
    },
};

export default meta;
type Story = StoryObj<typeof ScrollToTopButton>;

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
