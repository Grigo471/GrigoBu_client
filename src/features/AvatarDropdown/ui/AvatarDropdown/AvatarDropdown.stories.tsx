import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { AvatarDropdown } from './AvatarDropdown';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { UserRole } from '@/entities/User';
import AvatarImg from '@/shared/assets/tests/homer1200.jpg';
import { Theme } from '@/shared/const/theme';

const meta: Meta<typeof AvatarDropdown> = {
    title: 'features/AvatarDropdown',
    component: AvatarDropdown,
    tags: ['autodocs'],
    args: {
        onCloseModal: () => {},
    },
    decorators: [
        StoreDecorator({
            user: {
                authData: {
                    id: '1',
                    roles: [UserRole.ADMIN],
                    username: 'admin',
                    avatar: AvatarImg,
                },
            },
        }),
    ],
};

export default meta;
type Story = StoryObj<typeof AvatarDropdown>;

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
