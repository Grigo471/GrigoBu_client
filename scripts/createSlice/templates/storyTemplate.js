module.exports = (layer, componentName) => `import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { ${componentName} } from './${componentName}';

const meta: Meta<typeof ${componentName}> = {
   title: '${layer}/${componentName}',
   component: ${componentName},
   tags: ['autodocs'],
   argTypes: {
   },
};

export default meta;
type Story = StoryObj<typeof ${componentName}>;

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
`;
