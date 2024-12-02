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
        id: 1,
        username: '',
    },
    blocks: [],
};

const initialState: ArticleEditPageSchema = {
    isPreview: false,
    isLoading: false,
    error: undefined,
    isEdit: false,
    createForm: initialForm,
    editForm: initialForm,
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
        setIsEdit: (state, action: PayloadAction<boolean>) => {
            state.isEdit = action.payload;
        },
        setUser: (state, action: PayloadAction<User>) => {
            state.createForm.user = action.payload;
        },
        setIsPreview: (state, action: PayloadAction<boolean>) => {
            state.isPreview = action.payload;
        },
        setTags: (state, action: PayloadAction<string[]>) => {
            const form = state.isEdit ? state.editForm : state.createForm;
            form.tags = action.payload;
        },
        updateArticleTitle: (state, action: PayloadAction<string>) => {
            const form = state.isEdit ? state.editForm : state.createForm;
            form.title = action.payload;
        },
        updateArticleBlockTitle: {
            reducer: (state, action: PayloadAction<EditBlockPayload>) => {
                const { index, value } = action.payload;
                const form = state.isEdit ? state.editForm : state.createForm;
                const block = form?.blocks?.[index];
                block.title = value;
            },
            prepare: (value: string, index: number) => ({ payload: { index, value } }),
        },
        updateArticleBlockValue: {
            reducer: (state, action: PayloadAction<EditBlockPayload>) => {
                const { index, value, blockType } = action.payload;
                const form = state.isEdit ? state.editForm : state.createForm;
                const block = form.blocks?.[index];
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
            const form = state.isEdit ? state.editForm : state.createForm;
            switch (payload) {
            case 'text':
                form.blocks.push({
                    type: payload,
                    title: '',
                    paragraphs: '',
                    id: Date.now().toString(),
                });
                break;
            case 'code':
                form.blocks.push({
                    type: payload,
                    title: '',
                    code: '',
                    id: Date.now().toString(),
                });
                break;
            case 'image':
                form.blocks.push({
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
            const form = state.isEdit ? state.editForm : state.createForm;
            if (form.blocks && (payload > 0)) {
                form.blocks
                    .splice(payload - 1, 0, form.blocks.splice(payload, 1)[0]);
            }
        },
        moveBlockDown: (state, { payload }: PayloadAction<number>) => {
            const form = state.isEdit ? state.editForm : state.createForm;
            if (form.blocks && (payload < form.blocks.length - 1)) {
                form.blocks
                    .splice(payload + 1, 0, form.blocks.splice(payload, 1)[0]);
            }
        },
        deleteImage: (state, { payload }: PayloadAction<number>) => {
            const form = state.isEdit ? state.editForm : state.createForm;
            const block = form.blocks[payload];
            if (block.type === 'image') {
                block.src = '';
            }
        },
        deleteBlock: (state, action: PayloadAction<number>) => {
            const form = state.isEdit ? state.editForm : state.createForm;
            form.blocks = form?.blocks.filter(
                (block, index) => index !== action.payload,
            );
        },
        // clearState: (state) => {
        //     state.form = initialForm;
        // },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticleById.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchArticleById.fulfilled, (state, action: PayloadAction<Article>) => {
                state.isLoading = false;
                state.editForm = action.payload;
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
