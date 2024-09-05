import { StoryFn } from '@storybook/react';
import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider';
import { ReducerList } from '@/shared/lib/hooks/useDynamicModuleLoad';
import { articleDetailsReducers } from '@/entities/Article/testing';
import { addCommentFormReducer } from '@/features/AddCommentForm/testing';
import { articlesPageReducer } from '@/pages/ArticlesPage/testing';
import { UIReducer } from '@/features/UI/testing';
import { articleDetailsPageReducer } from '@/pages/ArticleDetailsPage/testing';
import { authReducer } from '@/features/AuthByUsername/testing';
import { profileCardReducers } from '@/features/ProfileCard/testing';
import { editableProfileReducers } from '@/features/EditableProfileCard/testing';

const defaultAsyncReducers: ReducerList = {
    authForm: authReducer,
    profileCard: profileCardReducers,
    editableProfileCard: editableProfileReducers,
    articleDetails: articleDetailsReducers,
    addCommentForm: addCommentFormReducer,
    articleDetailsPage: articleDetailsPageReducer,
    articlesPage: articlesPageReducer,
    UI: UIReducer,
};

export const StoreDecorator = (
    state: DeepPartial<StateSchema>,
    asyncReducers?: ReducerList,
) => (Story: StoryFn) => (
    <StoreProvider
        initialState={state}
        asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}
    >
        <Story />
    </StoreProvider>
);
