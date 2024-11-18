import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProfileCardSchema } from '../types/ProfileCardSchema';
import { fetchProfile } from '../services/fetchProfile';
import { subscribeToUser } from '../services/subscribeToUser';
import { unsubscribeToUser } from '../services/unsubscribeToUser';
import { User } from '@/entities/User';

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
                subscribeToUser.pending,
                (state) => {
                    state.isSubscribeLoading = true;
                },
            )
            .addCase(
                subscribeToUser.fulfilled,
                (state) => {
                    if (state.profileData) state.profileData.amISubscribed = true;
                    state.isSubscribeLoading = false;
                },
            )
            .addCase(
                subscribeToUser.rejected,
                (state, action) => {
                    state.isSubscribeLoading = false;
                    state.subscribeError = action.payload;
                },
            )
            .addCase(
                unsubscribeToUser.pending,
                (state) => {
                    state.isSubscribeLoading = true;
                },
            )
            .addCase(
                unsubscribeToUser.fulfilled,
                (state) => {
                    if (state.profileData) state.profileData.amISubscribed = false;
                    state.isSubscribeLoading = false;
                },
            )
            .addCase(
                unsubscribeToUser.rejected,
                (state, action) => {
                    state.isSubscribeLoading = false;
                    state.subscribeError = action.payload;
                },
            );
    },
});

export const { actions: profileCardActions } = ProfileCardSlice;
export const { reducer: profileCardReducers } = ProfileCardSlice;
