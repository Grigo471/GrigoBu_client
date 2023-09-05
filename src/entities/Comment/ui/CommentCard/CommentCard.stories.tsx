import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { CommentCard } from './CommentCard';

const meta: Meta<typeof CommentCard> = {
   title: 'shared/CommentCard',
   component: CommentCard,
   tags: ['autodocs'],
   argTypes: {
   },
};

export default meta;
type Story = StoryObj<typeof CommentCard>;

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

