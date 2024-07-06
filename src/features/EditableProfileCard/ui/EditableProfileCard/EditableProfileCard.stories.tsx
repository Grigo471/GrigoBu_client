import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/app/providers/ThemeProvider';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import AvatarImg from '@/shared/assets/tests/homer1200.jpg';
import { EditableProfileCard } from './EditableProfileCard';

const data = {
    id: '1',
    username: 'user',
    age: 23,
    country: Country.Russia,
    last: 'Fisher',
    first: 'Bob',
    city: 'LA',
    currency: Currency.USD,
    avatar: AvatarImg,
};

const meta: Meta<typeof EditableProfileCard> = {
    title: 'features/EditableProfileCard',
    component: EditableProfileCard,
    tags: ['autodocs'],
    decorators: [
        StoreDecorator({
            profile: {
                data,
                form: data,
                readOnly: true,
            },
            user: {
                authData: {
                    id: '1',
                    username: 'user',
                },
            },
        }),
    ],
};

export default meta;
type Story = StoryObj<typeof EditableProfileCard>;

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
