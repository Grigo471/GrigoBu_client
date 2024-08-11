import type { Meta, StoryObj } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import AvatarImg from '@/shared/assets/tests/homer1200.jpg';
import { ProfileCard } from './ProfileCard';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

const meta: Meta<typeof ProfileCard> = {
    title: 'entities/ProfileCard',
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

export const PrimaryRedesigned: Story = {
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
    decorators: [
        NewDesignDecorator,
    ],
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
