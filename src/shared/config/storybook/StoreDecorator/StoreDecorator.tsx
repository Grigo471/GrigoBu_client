/* eslint-disable grigo-eslint-plugin/public-api-imports */
// TODO
import { StoryFn } from '@storybook/react';
import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider';
import '@/app/styles/index.scss';
import { loginReducer } from '@/features/AuthByUsername/model/slice/loginSlice';
import { ReducerList } from '@/shared/lib/hooks/useDynamicModuleLoad';
import { articleDetailsReducers } from '@/entities/Article/model/slice/articleDetailsSlice';
import { addCommentFormReducer } from '@/features/AddCommentForm/model/slice/addCommentFormSlice';
import { articlesPageReducer } from '@/pages/ArticlesPage/model/slice/articlePageSlice';
import { UIReducer } from '@/features/UI';
import { articleDetailsPageReducer } from '@/pages/ArticleDetailsPage/model/slice';
import { profileReducer } from '@/features/EditableProfileCard/model/slice/profileSlice';

const defaultAsyncReducers: ReducerList = {
    loginForm: loginReducer,
    profile: profileReducer,
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
