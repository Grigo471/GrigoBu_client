import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { JsonSettings } from '../types/jsonSettings';
import { getUserAuthData } from '../selectors/getUserAuthData/getUserAuthData';
import { getJsonSettings } from '../selectors/getJsonSettings/getJsonSettings';
import { setJsonSettingsMutation } from '../../api/userApi';

export const saveJsonSettings = createAsyncThunk<JsonSettings, JsonSettings, ThunkConfig<string>>(
    'user/saveJsonSettings',
    async (newJsonSettings, thunkApi) => {
        const {
            rejectWithValue, getState, dispatch,
        } = thunkApi;
        const userData = getUserAuthData(getState());
        const currSettings = getJsonSettings(getState());

        if (!userData) {
            return rejectWithValue('error');
        }

        try {
            const response = await dispatch(setJsonSettingsMutation({
                userId: userData.id,
                jsonSettings: {
                    ...currSettings,
                    ...newJsonSettings,
                },
            })).unwrap();

            if (!response.jsonSettings) {
                return rejectWithValue('error');
            }

            return response.jsonSettings;
        } catch (error) {
            return rejectWithValue('error');
        }
    },
);
