import { StoryFn } from '@storybook/react';
import { FeatureFlags } from '@/shared/types/featureFlags';
import { setFeatureFlags } from '@/shared/lib/features';

export const FeatureFlagsDecorator = (features: FeatureFlags) => (Story: StoryFn) => {
    setFeatureFlags(features);
    return (
        <Story />
    );
};
