import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/app/providers/ThemeProvider';
import { ListBox } from './ListBox';

const people = [
    { value: '1', content: 'Durward Reynolds' },
    { value: '2', content: 'Kenton Towne' },
    { value: '3', content: 'Therese Wunsch', disabled: true },
    { value: '4', content: 'Benedict Kessler' },
    { value: '5', content: 'Katelyn Rohan' },
];

const meta: Meta<typeof ListBox> = {
    title: 'shared/ListBox',
    component: ListBox,
    tags: ['autodocs'],
    argTypes: {
    },
    decorators: [
        (Story) => <div style={{ padding: 100 }}><Story /></div>,
    ],
};

export default meta;
type Story = StoryObj<typeof ListBox>;

export const Light: Story = {
    args: {
        items: people,
        value: people[0].content,
        defaultValue: people[0].content,
        label: 'Выберите человека',
        onChange: (value: string) => {},
    },
};

export const LightDisabled: Story = {
    args: {
        items: people,
        value: people[0].content,
        defaultValue: people[0].content,
        label: 'Выберите человека',
        onChange: (value: string) => { },
        readonly: true,
    },
};

export const Dark: Story = {
    args: {
        items: people,
        value: people[0].content,
        defaultValue: people[0].content,
        label: 'Выберите человека',
        onChange: (value: string) => { },
    },
    decorators: [
        ThemeDecorator(Theme.DARK),
    ],
};

export const TopRightDirection: Story = {
    args: {
        items: people,
        value: '',
        defaultValue: '',
        label: 'Выберите человека',
        onChange: (value: string) => { },
        direction: 'topRight',
    },
};

export const TopLeftDirection: Story = {
    args: {
        items: people,
        value: '',
        defaultValue: '',
        label: 'Выберите человека',
        onChange: (value: string) => { },
        direction: 'topLeft',
    },
};

export const BottomRightDirection: Story = {
    args: {
        items: people,
        value: '',
        defaultValue: '',
        label: 'Выберите человека',
        onChange: (value: string) => { },
        direction: 'bottomRight',
    },
};

export const BottomLeftDirection: Story = {
    args: {
        items: people,
        value: '',
        defaultValue: '',
        label: 'Выберите человека',
        onChange: (value: string) => { },
        direction: 'bottomLeft',
    },
};
