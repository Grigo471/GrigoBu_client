import type { Preview } from '@storybook/react';
import { StyleDecorator } from '../../src/shared/config/storybook/StyleDecorator/StyleDecorator';
import { RouteDecorator } from '../../src/shared/config/storybook/RouteDecorator/RouteDecorator';
import {
    FeatureFlagsDecorator,
} from '../../src/shared/config/storybook/FeatureFlagsDecorator/FeatureFlagsDecorator';
import {
    SuspenseDecorator,
} from '../../src/shared/config/storybook/SuspenseDecorator/SuspenseDecorator';
import { Theme } from '../../src/shared/const/theme';

const preview: Preview = {
    decorators: [
        StyleDecorator,
        RouteDecorator,
        SuspenseDecorator,
        FeatureFlagsDecorator({}),
    ],
    parameters: {
        actions: { argTypesRegex: '^on[A-Z].*' },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
        chromatic: {
            viewports: [375, 1366],
        },
        layout: 'fullscreen',
        themes: {
            default: 'light',
            list: [
                { name: 'light', class: ['app', Theme.LIGHT], color: '#ffffff' },
                { name: 'dark', class: ['app', Theme.DARK], color: '#000000' },
                { name: 'brown', class: ['app', Theme.BROWN], color: '#4e260a' },
            ],
        },
    },
};

export default preview;
