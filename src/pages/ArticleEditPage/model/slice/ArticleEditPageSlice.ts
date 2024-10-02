import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
    Article, ArticleBlockType, fetchArticleById,
} from '@/entities/Article';
import { ArticleEditPageSchema } from '../types/ArticleEditPageSchema';
import { User } from '@/entities/User';
import { saveArticle } from '../services/saveArticle/saveArticle';

const initialForm: Article = {
    id: '',
    title: '',
    createdAt: '',
    rating: 0,
    tags: [],
    user: {
        username: '',
    },
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
    blockType?: ArticleBlockType;
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
        setTags: (state, action: PayloadAction<string[]>) => {
            state.form.tags = action.payload;
        },
        updateArticleTitle: (state, action: PayloadAction<string>) => {
            state.form.title = action.payload;
        },
        updateArticleBlockTitle: {
            reducer: (state, action: PayloadAction<EditBlockPayload>) => {
                const { index, value } = action.payload;
                const block = state.form?.blocks?.[index];
                block.title = value;
            },
            prepare: (value: string, index: number) => ({ payload: { index, value } }),
        },
        updateArticleBlockValue: {
            reducer: (state, action: PayloadAction<EditBlockPayload>) => {
                const { index, value, blockType } = action.payload;
                const block = state.form?.blocks?.[index];
                switch (blockType) {
                case 'text':
                    if (block?.type === 'text') block.paragraphs = value;
                    break;
                case 'code':
                    if (block?.type === 'code') block.code = value;
                    break;
                case 'image':
                    if (block?.type === 'image') block.src = value;
                    break;
                default: break;
                }
            },
            prepare: (
                value: string,
                index: number,
                blockType: ArticleBlockType,
            ) => ({ payload: { index, value, blockType } }),
        },
        addArticleBlock: (state, { payload }: PayloadAction<ArticleBlockType>) => {
            switch (payload) {
            case 'text':
                state.form?.blocks.push({
                    type: payload,
                    title: '',
                    paragraphs: '',
                    id: Date.now().toString(),
                });
                break;
            case 'code':
                state.form?.blocks.push({
                    type: payload,
                    title: '',
                    code: '',
                    id: Date.now().toString(),
                });
                break;
            case 'image':
                state.form?.blocks.push({
                    type: payload,
                    title: '',
                    src: '',
                    id: Date.now().toString(),
                });
                break;
            default: break;
            }
        },
        moveBlockUp: (state, { payload }: PayloadAction<number>) => {
            if (state.form.blocks && (payload > 0)) {
                state.form.blocks
                    .splice(payload - 1, 0, state.form.blocks.splice(payload, 1)[0]);
            }
        },
        moveBlockDown: (state, { payload }: PayloadAction<number>) => {
            if (state.form.blocks && (payload < state.form.blocks.length - 1)) {
                state.form.blocks
                    .splice(payload + 1, 0, state.form.blocks.splice(payload, 1)[0]);
            }
        },
        deleteImage: (state, { payload }: PayloadAction<number>) => {
            const block = state.form.blocks[payload];
            if (block.type === 'image') {
                block.src = '';
            }
        },
        deleteBlock: (state, action: PayloadAction<number>) => {
            state.form.blocks = state.form?.blocks.filter(
                (block, index) => index !== action.payload,
            );
        },
        clearState: (state) => {
            state.form = initialForm;
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
