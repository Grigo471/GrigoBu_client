import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { Modal } from './Modal';

const meta: Meta<typeof Modal> = {
    title: 'shared/Modal',
    component: Modal,
    tags: ['autodocs'],
    argTypes: {
    },
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Light: Story = {
    args: {
        isOpen: true,
        children: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt nostrum doloremque eveniet porro similique iste! Voluptates eos deserunt voluptate dignissimos odio debitis, autem vero veniam ullam quo quisquam error? Ipsum!',
    },
};

export const Dark: Story = {
    args: {
        isOpen: true,
        children: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt nostrum doloremque eveniet porro similique iste! Voluptates eos deserunt voluptate dignissimos odio debitis, autem vero veniam ullam quo quisquam error? Ipsum!',
    },
    decorators: [
        ThemeDecorator(Theme.DARK),
    ],
};
