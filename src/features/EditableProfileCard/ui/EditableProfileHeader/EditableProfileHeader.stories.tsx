import type { Meta, StoryObj } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { EditableProfileHeader } from './EditableProfileHeader';

const data = {
    id: '1',
    username: 'admin',
    age: 23,
    country: Country.Russia,
    last: 'Fisher',
    first: 'Bob',
    city: 'LA',
    currency: Currency.USD,
};

const meta: Meta<typeof EditableProfileHeader> = {
    title: 'features/EditableProfileCard/EditableProfileHeader',
    component: EditableProfileHeader,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof EditableProfileHeader>;

export const CanEdit: Story = {
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
                    username: 'admin',
                },
            },
        }),
    ],
};

export const CannotEdit: Story = {
    decorators: [
        StoreDecorator({
            profile: {
                data,
                form: data,
                readOnly: true,
            },
            user: {
                authData: {
                    id: '2',
                    username: 'user',
                },
            },
        }),
    ],
};
