import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/app/providers/ThemeProvider';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ArticleSortField } from '@/entities/Article';
import { ArticlesPageFilter } from './ArticlesPageFilter';

const meta: Meta<typeof ArticlesPageFilter> = {
    title: 'pages/ArticlesPage/ArticlesPageFilter',
    component: ArticlesPageFilter,
    tags: ['autodocs'],
    argTypes: {
    },
    decorators: [
        StoreDecorator({
            articlesPage: {
                limit: 9,
                sort: ArticleSortField.CREATED,
                search: '',
                order: 'asc',
            },
        }),
    ],
};

export default meta;
type Story = StoryObj<typeof ArticlesPageFilter>;

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
