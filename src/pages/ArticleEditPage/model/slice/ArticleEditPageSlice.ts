import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
    Article, ArticleBlockType, ArticleType, fetchArticleById,
} from '@/entities/Article';
import { ArticleEditPageSchema } from '../types/ArticleEditPageSchema';
import { User } from '@/entities/User';
import { saveArticle } from '../services/saveArticle/saveArticle';

const initialForm: Article = {
    id: '',
    title: '',
    subtitle: '',
    createdAt: Date.now().toString(),
    views: 0,
    user: {
        id: 'initial_id',
        username: '',
    },
    img: '',
    type: [ArticleType.IT],
    blocks: [],
};

const initialState: ArticleEditPageSchema = {
    isPreview: false,
    isLoading: false,
    error: undefined,
    form: initialForm,
};

interface EditBlockPayload {
    index: number;
    value: string;
}

export const articleEditPageSlice = createSlice({
    name: 'articleEditPage',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.form.user = action.payload;
        },
        setIsPreview: (state, action: PayloadAction<boolean>) => {
            state.isPreview = action.payload;
        },
        updateArticleTitle: (state, action: PayloadAction<string>) => {
            state.form.title = action.payload;
        },
        updateArticleSubtitle: (state, action: PayloadAction<string>) => {
            state.form.subtitle = action.payload;
        },
        updateArticleImage: (state, action: PayloadAction<string>) => {
            state.form.img = action.payload;
        },
        updateArticleType: (state, action: PayloadAction<ArticleType>) => {
            state.form.type = [action.payload];
        },
        updateArticleBlockTitle: {
            reducer: (state, action: PayloadAction<EditBlockPayload>) => {
                const { index, value } = action.payload;
                const block = state.form?.blocks?.[index];
                block.title = value;
            },
            prepare: (value: string, index: number) => ({ payload: { index, value } }),
        },
        updateArticleBlockText: {
            reducer: (state, action: PayloadAction<EditBlockPayload>) => {
                const { index, value } = action.payload;
                const block = state.form?.blocks?.[index];
                if (
                    block?.type === ArticleBlockType.TEXT
                ) {
                    block.paragraphs = value;
                }
            },
            prepare: (value: string, index: number) => ({ payload: { index, value } }),
        },
        updateArticleBlockImage: {
            reducer: (state, action: PayloadAction<EditBlockPayload>) => {
                const { index, value } = action.payload;
                const block = state.form?.blocks?.[index];
                if (
                    block?.type === ArticleBlockType.IMAGE
                ) {
                    block.src = value;
                }
            },
            prepare: (value: string, index: number) => ({ payload: { index, value } }),
        },
        updateArticleBlockCode: {
            reducer: (state, action: PayloadAction<EditBlockPayload>) => {
                const { index, value } = action.payload;
                const block = state.form?.blocks?.[index];
                if (
                    block?.type === ArticleBlockType.CODE
                ) {
                    block.code = value;
                }
            },
            prepare: (value: string, index: number) => ({ payload: { index, value } }),
        },
        addArticleTextBlock: (state) => {
            state.form?.blocks.push({
                type: ArticleBlockType.TEXT,
                title: '',
                paragraphs: '',
                id: state.form.blocks.length.toString(),
            });
        },
        addArticleImageBlock: (state) => {
            state.form.blocks.push({
                type: ArticleBlockType.IMAGE,
                title: '',
                src: '',
                id: state.form.blocks.length.toString(),
            });
        },
        addArticleCodeBlock: (state) => {
            state.form?.blocks.push({
                type: ArticleBlockType.CODE,
                title: '',
                code: '',
                id: state.form.blocks.length.toString(),
            });
        },
        deleteBlock: (state, action: PayloadAction<number>) => {
            state.form.blocks = state.form?.blocks.filter(
                (block, index) => index !== action.payload,
            );
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticleById.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchArticleById.fulfilled, (state, action: PayloadAction<Article>) => {
                state.isLoading = false;
                state.form = action.payload;
            })
            .addCase(fetchArticleById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(saveArticle.pending, (state) => {
                state.validateErrors = undefined;
                state.isLoading = true;
            })
            .addCase(saveArticle.fulfilled, (state) => {
                state.isLoading = false;
                state.isPreview = true;
                state.validateErrors = undefined;
            })
            .addCase(saveArticle.rejected, (state, action) => {
                state.isLoading = false;
                state.validateErrors = action.payload;
            });
    },
});

export const { actions: articleEditPageActions } = articleEditPageSlice;
export const { reducer: articleEditPageReducers } = articleEditPageSlice;
