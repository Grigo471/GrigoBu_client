import type { Meta, StoryObj } from '@storybook/react';
import { ArticlesPageGreeting } from './ArticlesPageGreeting';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

const meta: Meta<typeof ArticlesPageGreeting> = {
    title: 'features/ArticlesPageGreeting',
    component: ArticlesPageGreeting,
    tags: ['autodocs'],
    argTypes: {
    },
};

export default meta;
type Story = StoryObj<typeof ArticlesPageGreeting>;

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
