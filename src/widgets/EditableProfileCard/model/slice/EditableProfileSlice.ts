import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EditableProfileSchema } from '../types/EditableProfileSchema';
import { updateAvatar } from '../services/updateAvatar';
import { fetchProfile, User } from '@/entities/User';

const initialState: EditableProfileSchema = {

};

export const EditableProfileSlice = createSlice({
    name: 'EditableProfile',
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
                updateAvatar.pending,
                (state) => {
                    state.isAvatarLoading = true;
                },
            )
            .addCase(
                updateAvatar.fulfilled,
                (state) => {
                    state.isAvatarLoading = false;
                    state.avatarError = undefined;
                },
            )
            .addCase(
                updateAvatar.rejected,
                (state, action) => {
                    state.isAvatarLoading = false;
                    state.avatarError = action.payload;
                },
            );
    },
});

export const { actions: editableProfileActions } = EditableProfileSlice;
export const { reducer: editableProfileReducers } = EditableProfileSlice;
