import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { NotificationsButton } from './NotificationsButton';

const meta: Meta<typeof NotificationsButton> = {
   title: 'shared/NotificationsButton',
   component: NotificationsButton,
   tags: ['autodocs'],
   argTypes: {
   },
};

export default meta;
type Story = StoryObj<typeof NotificationsButton>;

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

