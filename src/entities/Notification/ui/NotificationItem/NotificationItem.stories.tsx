import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { NotificationItem } from './NotificationItem';
import { Notification } from '../../model/types/notification';
import { Theme } from '@/shared/const/theme';

const notification: Notification = {
    id: 1,
    type: 'comment',
    name: 'This is notification',
};

const meta: Meta<typeof NotificationItem> = {
    title: 'entities/Notification/NotificationItem',
    component: NotificationItem,
    tags: ['autodocs'],
    args: {
        item: notification,
    },
};

export default meta;
type Story = StoryObj<typeof NotificationItem>;

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
