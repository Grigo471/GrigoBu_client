import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { FeatureFlags } from '@/shared/types/featureFlags';
import { updateFeatureFlagsMutation } from '../api/featureFlagsApi';
import { getAllFeatureFlags } from '../lib/setGetFeatures';
import { LOCAL_STORAGE_LAST_DESIGN_KEY } from '@/shared/const/localStorage';

interface UpdateFeatureFlagsProps {
    userId: string;
    newFeatures: Partial<FeatureFlags>
}

export const updateFeatureFlags = createAsyncThunk<
    void,
    UpdateFeatureFlagsProps,
    ThunkConfig<string>
>(
    'features/updateFeatureFlags',
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

            localStorage.setItem(
                LOCAL_STORAGE_LAST_DESIGN_KEY,
                newFeatures?.isAppRedesigned ? 'new' : 'old',
            );

            window.location.reload();
        } catch (error) {
            return rejectWithValue('error');
        }
    },
);
