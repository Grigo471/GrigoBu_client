import { StoryFn } from '@storybook/react';
import 'app/styles/index.scss';
import { Suspense } from 'react';

export const SuspenseDecorator = (Story: StoryFn) => (
    <Suspense>
        <Story />
    </Suspense>
);
