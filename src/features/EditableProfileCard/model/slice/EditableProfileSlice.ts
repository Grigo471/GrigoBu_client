import { createSlice } from '@reduxjs/toolkit';
import { EditableProfileSchema } from '../types/EditableProfileSchema';
import { updateAvatar } from '../services/updateAvatar';

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
