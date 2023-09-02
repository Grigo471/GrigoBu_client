import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import AvatarImg from 'shared/assets/tests/homer1200.jpg';
import ProfilePage from './ProfilePage';

const meta: Meta<typeof ProfilePage> = {
    title: 'pages/ProfilePage',
    component: ProfilePage,
    tags: ['autodocs'],
    decorators: [
        StoreDecorator({
        }),
    ],
};

export default meta;
type Story = StoryObj<typeof ProfilePage>;

export const Light: Story = {
    decorators: [
        StoreDecorator({
            profile: {
                form: {
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
        }),
    ],
};

export const Dark: Story = {
    decorators: [
        ThemeDecorator(Theme.DARK),
        StoreDecorator({
            profile: {
                form: {
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
        }),
    ],
};
