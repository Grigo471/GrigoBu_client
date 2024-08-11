import type { Meta, StoryObj } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import AvatarImg from '@/shared/assets/tests/homer1200.jpg';
import { ProfileCardDeprecated as ProfileCard } from './ProfileCardDeprecated';

const meta: Meta<typeof ProfileCard> = {
    title: 'entities/ProfileCardDeprecated',
    component: ProfileCard,
    tags: ['autodocs'],
    decorators: [
        StoreDecorator({
            loginForm: { username: '123', password: '123' },
        }),
    ],
};

export default meta;
type Story = StoryObj<typeof ProfileCard>;

export const Primary: Story = {
    args: {
        data: {
            username: 'admin',
            age: 23,
            country: Country.Russia,
            last: 'Fisher',
            first: 'Bob',
            city: 'LA',
            currency: Currency.USD,
            avatar: AvatarImg,
        },
    },
};

export const withError: Story = {
    args: {
        error: 'error',
    },
};

export const Loading: Story = {
    args: {
        isLoading: true,
    },
};
