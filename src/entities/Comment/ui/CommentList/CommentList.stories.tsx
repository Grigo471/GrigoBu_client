import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { CommentList } from './CommentList';

const meta: Meta<typeof CommentList> = {
   title: 'shared/CommentList',
   component: CommentList,
   tags: ['autodocs'],
   argTypes: {
   },
};

export default meta;
type Story = StoryObj<typeof CommentList>;

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

