import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { CommentList } from './CommentList';
import { Comment } from '../../model/types/comment';
import { Theme } from '@/shared/const/theme';

const comments: Comment[] = [
    {
        id: '1',
        text: 'hello',
        user: {
            id: 1,
            username: 'Billy',
            createdAt: '',
        },
    },
    {
        id: '2',
        text: 'goodbye',
        user: {
            id: 2,
            username: 'Bob',
            createdAt: '',
        },
    },
];

const meta: Meta<typeof CommentList> = {
    title: 'entities/Comment/CommentList',
    component: CommentList,
    tags: ['autodocs'],
    argTypes: {
    },
};

export default meta;
type Story = StoryObj<typeof CommentList>;

export const Light: Story = {
    args: {
        comments,
    },
};

export const Loading: Story = {
    args: {
        comments,
        isLoading: true,
    },
};

export const Dark: Story = {
    args: {
        comments,
    },
    decorators: [
        ThemeDecorator(Theme.DARK),
    ],
};
