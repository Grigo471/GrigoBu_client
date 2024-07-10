import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { ArticleRecommendationsList } from './ArticleRecommendationsList';
import { ArticleType } from '@/entities/Article';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { Theme } from '@/shared/const/theme';

const article = {
    title: 'JavaScript news',
    subtitle: 'Что нового в JS за 2023-й год?',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1200px-Unofficial_JavaScript_logo_2.svg.png',
    views: 1022,
    createdAt: '04.09.2023',
    user: {
        id: '1',
        username: 'Grigo',
        avatar: 'https://p.turbosquid.com/ts-thumb/Ax/XUKtDV/FxtkjVoD/homer1200/jpg/1590143115/600x600/fit_q87/c8d0e5a16813b132c3740438479c620649e28627/homer1200.jpg',
    },
    type: [ArticleType.IT],
    blocks: [
    ],
};

const meta: Meta<typeof ArticleRecommendationsList> = {
    title: 'features/ArticleRecommendationsList',
    component: ArticleRecommendationsList,
    tags: ['autodocs'],
    decorators: [
        StoreDecorator({}),
    ],
    parameters: {
        mockData: [
            {
                url: `${__API__}/articles?_limit=3`,
                method: 'GET',
                status: 200,
                response: [
                    { ...article, id: '1' },
                    { ...article, id: '2' },
                    { ...article, id: '3' },
                ],
            },
        ],
    },
};

export default meta;
type Story = StoryObj<typeof ArticleRecommendationsList>;

export const Light: Story = {
};

export const Dark: Story = {
    decorators: [
        ThemeDecorator(Theme.DARK),
    ],
};
