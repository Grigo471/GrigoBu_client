import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { Text } from './Text';

const meta: Meta<typeof Text> = {
    title: 'shared/redesigned/TextRedesigned',
    component: Text,
    decorators: [ThemeDecorator(Theme.LIGHT)],
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Primary: Story = {
    args: {
        title: 'Story title',
        text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy',
    },
};

export const Error: Story = {
    args: {
        title: 'Story title',
        text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy',
        variant: 'error',
    },
};

export const OnlyTitle: Story = {
    args: {
        title: 'Story title',
    },
};

export const OnlyText: Story = {
    args: {
        text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy',
    },
};

export const Dark: Story = {
    args: {
        title: 'Story title',
        text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy',
    },
    decorators: [ThemeDecorator(Theme.DARK)],
};

export const SizeS: Story = {
    args: {
        size: 's',
        title: 'Story title',
        text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy',
    },
};

export const SizeM: Story = {
    args: {
        size: 'm',
        title: 'Story title',
        text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy',
    },
};

export const SizeL: Story = {
    args: {
        size: 'l',
        title: 'Story title',
        text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy',
    },
};
