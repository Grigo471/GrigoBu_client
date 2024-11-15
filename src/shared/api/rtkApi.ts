import {
    BaseQueryFn, createApi, FetchArgs, fetchBaseQuery,
    FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { LOCAL_STORAGE_TOKEN_KEY } from '../const/localStorage';

const baseQuery = fetchBaseQuery({
    baseUrl: __API__,
    prepareHeaders: (headers) => {
        headers.set('Authorization', `Bearer ${localStorage
            .getItem(LOCAL_STORAGE_TOKEN_KEY) || ''}`);
        return headers;
    },
    credentials: 'include',
});

const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    if (result.error && result.error.status === 401) {
        const refreshResult = await baseQuery('/auth/refresh', api, extraOptions);
        if (refreshResult.data) {
            // @ts-ignore
            localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, refreshResult.data.accessToken);
            result = await baseQuery(args, api, extraOptions);
        } else {
            console.log('Не авторизован');
        }
    }
    return result;
};

export const rtkApi = createApi({
    reducerPath: 'rtkApi',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
    }),
    tagTypes: ['Articles'],
});
