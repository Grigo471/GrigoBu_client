import {
    AnyAction, CombinedState, EnhancedStore, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { UserSchema } from '@/entities/User';
import { AddCommentFormSchema } from '@/features/AddCommentForm';
import { AuthSchema } from '@/features/AuthByUsername';
import { UISchema } from '@/features/UI';
import { ArticleDetailsPageSchema } from '@/pages/ArticleDetailsPage';
import { rtkApi } from '@/shared/api/rtkApi';
import { ArticleEditPageSchema } from '@/pages/ArticleEditPage';
import { EditableProfileSchema } from '@/widgets/EditableProfileCard';
import { ProfileCardSchema } from '@/widgets/ProfileCard';
import { ArticleTagsSelectorSchema } from '@/features/ArticleTagsSelector';
import { UsersPageSchema } from '@/pages/UsersPage';
import { ArticlesPageSchema } from '@/pages/ArticlesPage';
import { SubscriptionsPageSchema } from '@/pages/SubscriptionsPage';
import { ProfilePageSchema } from '@/pages/ProfilePage';
import { ArticlesListsPagesSchema } from '@/entities/Article';

export interface StateSchema {
    user: UserSchema;
    UI: UISchema;
    [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>;
    profilePage: ProfilePageSchema;
    articlesListsPages: ArticlesListsPagesSchema;

    usersPage?: UsersPageSchema;
    authForm?: AuthSchema;
    editableProfileCard?: EditableProfileSchema;
    profileCard?: ProfileCardSchema;
    articlesPage?: ArticlesPageSchema;
    subscriptionsPage?: SubscriptionsPageSchema;
    addCommentForm?: AddCommentFormSchema;
    articleDetailsPage?: ArticleDetailsPageSchema;
    articleEditPage?: ArticleEditPageSchema;
    articleTagsSelector?: ArticleTagsSelectorSchema;
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
    errorMessage: (error: unknown) => string | undefined;
}

export interface ThunkConfig<T>{
    rejectValue: T;
    extra: ThunkExtraArg;
    state: StateSchema;
}
