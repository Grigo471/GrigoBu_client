import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ArticleDetailsCommentsSchema } from '../../model/types/ArticleDetailsCommentsSchema';
import { ArticleDetailsComments } from './ArticleDetailsComments';
import { Theme } from '@/shared/const/theme';

const comments: ArticleDetailsCommentsSchema = {
    ids: [1, 2],
    entities: {
        1: {
            id: '1',
            text: 'hello',
            user: {
                id: 2,
                username: 'Billy',
                createdAt: '',
            },
        },
        2: {
            id: '2',
            text: 'goodbye',
            user: {
                id: 1,
                username: 'Bob',
                createdAt: '',
            },
        },
    },
};

const meta: Meta<typeof ArticleDetailsComments> = {
    title: 'pages/ArticleDetailsPage/AricleDetailsComments',
    component: ArticleDetailsComments,
    tags: ['autodocs'],
    argTypes: {
    },
    decorators: [
        StoreDecorator({
            articleDetailsPage: {
                comments,
            },
        }),
    ],
};

export default meta;
type Story = StoryObj<typeof ArticleDetailsComments>;

export const Light: Story = {
    args: {
        id: '1',
    },
};

export const Dark: Story = {
    args: {
        id: '1',
    },
    decorators: [
        ThemeDecorator(Theme.DARK),
    ],
};
