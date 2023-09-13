import type { Meta, StoryObj } from '@storybook/react';

import { CommentCard } from './CommentCard';
import { Comment } from '../../model/types/comment';

const comment: Comment = {
    id: '1',
    text: 'hello',
    user: {
        id: '1',
        username: 'Billy',
    },
};

const meta: Meta<typeof CommentCard> = {
    title: 'entities/Comment/CommentCard',
    component: CommentCard,
    tags: ['autodocs'],
    argTypes: {
    },
};

export default meta;
type Story = StoryObj<typeof CommentCard>;

export const Normal: Story = {
    args: {
        comment,
    },
};

export const Loading: Story = {
    args: {
        comment,
        isLoading: true,
    },
};
