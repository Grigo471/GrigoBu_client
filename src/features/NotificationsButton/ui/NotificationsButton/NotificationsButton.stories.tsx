import type { Meta, StoryObj } from '@storybook/react';

import { delay } from '@reduxjs/toolkit/dist/utils';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/app/providers/ThemeProvider';
import { NotificationsButton } from './NotificationsButton';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

const notifications = [
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

const meta: Meta<typeof NotificationsButton> = {
    title: 'features/NotificationsButton',
    component: NotificationsButton,
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
type Story = StoryObj<typeof NotificationsButton>;

export const Light: Story = {
    args: {

    },
};

export const LightLoading: Story = {
    parameters: {
        mockData: [
            {
                url: `${__API__}/notifications`,
                method: 'GET',
                status: 200,
                response: notifications,
                delay: 10000,
            },
        ],
    },
};

export const Dark: Story = {
    args: {

    },
    decorators: [
        ThemeDecorator(Theme.DARK),
    ],
};
