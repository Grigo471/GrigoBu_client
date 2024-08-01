import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { FeatureFlags } from '@/shared/types/featureFlags';
import { updateFeatureFlagsMutation } from '../api/featureFlagsApi';
import { getAllFeatureFlags } from '../lib/setGetFeatures';

interface UpdateFeatureFlagsProps {
    userId: string;
    newFeatures: Partial<FeatureFlags>
}

export const updateFeatureFlags = createAsyncThunk<
    void,
    UpdateFeatureFlagsProps,
    ThunkConfig<string>
>(
    'user/initAuthData',
    async ({ userId, newFeatures }, thunkApi) => {
        const { rejectWithValue, dispatch } = thunkApi;

        try {
            await dispatch(
                updateFeatureFlagsMutation({
                    userId,
                    features: {
                        ...getAllFeatureFlags(),
                        ...newFeatures,
                    },
                }),
            );

            window.location.reload();
        } catch (error) {
            return rejectWithValue('error');
        }
    },
);
