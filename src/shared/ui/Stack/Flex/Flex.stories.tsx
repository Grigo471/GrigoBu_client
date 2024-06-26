import type { Meta, StoryObj } from '@storybook/react';
import { Flex } from './Flex';

const meta: Meta<typeof Flex> = {
    title: 'shared/Flex',
    component: Flex,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Flex>;

export const Row: Story = {
    args: {
        children: (
            <>
                <div>Text</div>
                <div>Text</div>
                <div>Text</div>
                <div>Text</div>
                <div>Text</div>
            </>
        ),
    },
};

export const RowGap4: Story = {
    args: {
        gap: '4',
        children: (
            <>
                <div>Text</div>
                <div>Text</div>
                <div>Text</div>
                <div>Text</div>
                <div>Text</div>
            </>
        ),
    },
};

export const RowGap8: Story = {
    args: {
        gap: '8',
        children: (
            <>
                <div>Text</div>
                <div>Text</div>
                <div>Text</div>
                <div>Text</div>
                <div>Text</div>
            </>
        ),
    },
};

export const RowGap16: Story = {
    args: {
        gap: '16',
        children: (
            <>
                <div>Text</div>
                <div>Text</div>
                <div>Text</div>
                <div>Text</div>
                <div>Text</div>
            </>
        ),
    },
};

export const Column: Story = {
    args: {
        direction: 'column',
        children: (
            <>
                <div>Text</div>
                <div>Text</div>
                <div>Text</div>
                <div>Text</div>
                <div>Text</div>
            </>
        ),
    },
};

export const ColumnGap16: Story = {
    args: {
        direction: 'column',
        gap: '16',
        children: (
            <>
                <div>Text</div>
                <div>Text</div>
                <div>Text</div>
                <div>Text</div>
                <div>Text</div>
            </>
        ),
    },
};

export const ColumnGap32: Story = {
    args: {
        direction: 'column',
        gap: '32',
        children: (
            <>
                <div>Text</div>
                <div>Text</div>
                <div>Text</div>
                <div>Text</div>
                <div>Text</div>
            </>
        ),
    },
};
