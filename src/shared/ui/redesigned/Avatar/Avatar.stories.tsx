import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';
import AvatarImg from '../../../assets/tests/homer1200.jpg';

const meta: Meta<typeof Avatar> = {
    title: 'shared/redesigned/Avatar',
    component: Avatar,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Primary: Story = {
    args: {
        size: 150,
        src: AvatarImg,
        alt: 'Homer',
    },
};

export const Small: Story = {
    args: {
        size: 50,
        src: AvatarImg,
        alt: 'Homer',
    },
};
