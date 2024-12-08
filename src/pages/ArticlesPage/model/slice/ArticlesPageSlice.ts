import {
    PayloadAction,
    createSlice,
} from '@reduxjs/toolkit';
import {
    Rate,
} from '@/entities/Article';
import { ArticlesPageSchema } from '../types/ArticlesPageSchema';

const initialState: ArticlesPageSchema = {
    tags: [],
    tagsVisible: false,
};

const articlesPageSlice = createSlice({
    name: 'articlesPageSlice',
    initialState,
    reducers: {
        setTags: (state, action: PayloadAction<string[]>) => {
            state.tags = action.payload;
        },
        toggleTagsVisible: (state) => {
            state.tagsVisible = !state.tagsVisible;
        },
        setMyRateFilter: (state, action: PayloadAction<Rate | undefined>) => {
            state.myRateFilter = action.payload;
        },
    },
});

export const {
    reducer: articlesPageReducer,
    actions: articlesPageActions,
} = articlesPageSlice;
