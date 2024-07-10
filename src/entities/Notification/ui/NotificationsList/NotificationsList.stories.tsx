import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { NotificationsList } from './NotificationsList';
import { Notification } from '../../model/types/notification';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { Theme } from '@/shared/const/theme';

const notifications: Notification[] = [
    {
        id: '1',
        title: 'Notification 1',
        description: 'This is notification',
    },
    {
        id: '2',
        title: 'Notification 2',
        description: 'This is notification',
    },
    {
        id: '3',
        title: 'Notification 3',
        description: 'This is notification',
    },
];

const meta: Meta<typeof NotificationsList> = {
    title: 'entities/Notification/NotificationsList',
    component: NotificationsList,
    tags: ['autodocs'],
    decorators: [
        StoreDecorator({}),
    ],
    parameters: {
        mockData: [
            {
                url: `${__API__}/notifications`,
                method: 'GET',
                status: 200,
                response: notifications,
            },
        ],
    },
};

export default meta;
type Story = StoryObj<typeof NotificationsList>;

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
