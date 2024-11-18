import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProfileCardSchema } from '../types/ProfileCardSchema';
import { fetchProfile } from '../services/fetchProfile';
import { User } from '@/entities/User';
import { subscribeToUser, unsubscribeToUser } from '@/features/SubscribeToUserButton';

const initialState: ProfileCardSchema = {
};

export const ProfileCardSlice = createSlice({
    name: 'ProfileCard',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(
                fetchProfile.pending,
                (state) => {
                    state.isLoading = true;
                },
            )
            .addCase(
                fetchProfile.fulfilled,
                (state, { payload }: PayloadAction<User>) => {
                    state.isLoading = false;
                    state.profileData = payload;
                    state.error = undefined;
                },
            )
            .addCase(
                fetchProfile.rejected,
                (state, action) => {
                    state.isLoading = false;
                    state.error = action.payload;
                },
            )
            .addCase(
                subscribeToUser.fulfilled,
                (state) => {
                    if (state.profileData) state.profileData.amISubscribed = true;
                },
            )
            .addCase(
                unsubscribeToUser.fulfilled,
                (state) => {
                    if (state.profileData) state.profileData.amISubscribed = false;
                },
            );
    },
});

export const { actions: profileCardActions } = ProfileCardSlice;
export const { reducer: profileCardReducers } = ProfileCardSlice;
