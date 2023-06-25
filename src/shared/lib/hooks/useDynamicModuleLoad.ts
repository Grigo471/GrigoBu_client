import { Reducer } from '@reduxjs/toolkit';
import { ReduxStoreWithManager } from 'app/providers/StoreProvider';
import { StateSchemaKey } from 'app/providers/StoreProvider/config/StateSchema';
import { useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';

export type ReducerList = {
    [key in StateSchemaKey]?: Reducer;
}

type ReducerListEntry = [StateSchemaKey, Reducer];

export interface useDynamicModuleLoaderArgs {
    reducers: ReducerList;
    removeAfterUnmount?: boolean;
}

export function useDynamicModuleLoad(args: useDynamicModuleLoaderArgs) {
    const { reducers, removeAfterUnmount = true } = args;

    const dispatch = useDispatch();

    const store = useStore() as ReduxStoreWithManager;

    useEffect(() => {
        Object.entries(reducers).forEach(([key, reducer]) => {
            store.reducerManager.add(key as StateSchemaKey, reducer);
            dispatch({ type: `@INIT ${key} reducer` });
        });

        return () => {
            if (removeAfterUnmount) {
                Object.entries(reducers).forEach(([key, reducer]) => {
                    store.reducerManager.remove(key as StateSchemaKey);
                    dispatch({ type: `@DESTROY ${key} reducer` });
                });
            }
        };
        // eslint-disable-next-line
    }, []);
}
