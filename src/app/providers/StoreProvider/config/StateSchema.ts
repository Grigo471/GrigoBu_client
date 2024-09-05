import {
    AnyAction, CombinedState, EnhancedStore, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { ArticleDetailsSchema } from '@/entities/Article';
import { UserSchema } from '@/entities/User';
import { AddCommentFormSchema } from '@/features/AddCommentForm';
import { AuthSchema } from '@/features/AuthByUsername';
import { UISchema } from '@/features/UI';
import { ArticleDetailsPageSchema } from '@/pages/ArticleDetailsPage';
import { ArticlesPageSchema } from '@/pages/ArticlesPage';
import { rtkApi } from '@/shared/api/rtkApi';
import { ArticleEditPageSchema } from '@/pages/ArticleEditPage';
import { EditableProfileSchema } from '@/features/EditableProfileCard';
import { ProfileCardSchema } from '@/features/ProfileCard';

export interface StateSchema {
    user: UserSchema;
    UI: UISchema;
    [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>;

    authForm?: AuthSchema;
    editableProfileCard?: EditableProfileSchema;
    profileCard?: ProfileCardSchema;
    articleDetails?: ArticleDetailsSchema;
    addCommentForm?: AddCommentFormSchema;
    articlesPage?: ArticlesPageSchema;
    articleDetailsPage?: ArticleDetailsPageSchema;
    articleEditPage?: ArticleEditPageSchema;
}

export type StateSchemaKey = keyof StateSchema;

export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>;

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>,
    reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>,
    add: (key: StateSchemaKey, reducer: Reducer) => void,
    remove: (key: StateSchemaKey) => void,
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager: ReducerManager;
}

export interface ThunkExtraArg {
    api: AxiosInstance;
}

export interface ThunkConfig<T>{
    rejectValue: T;
    extra: ThunkExtraArg;
    state: StateSchema;
}
