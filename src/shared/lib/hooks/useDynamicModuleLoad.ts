import { Reducer } from '@reduxjs/toolkit';
import { useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';
import { ReduxStoreWithManager } from '@/app/providers/StoreProvider';
import { StateSchema, StateSchemaKey } from '@/app/providers/StoreProvider/config/StateSchema';

export type ReducerList = {
    [key in StateSchemaKey]?: Reducer<NonNullable<StateSchema[key]>>;
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

    const mountedReducers = store.reducerManager.getReducerMap();

    useEffect(() => {
        Object.entries(reducers).forEach(([key, reducer]) => {
            const mounted = mountedReducers[key as StateSchemaKey];
            if (!mounted) {
                store.reducerManager.add(key as StateSchemaKey, reducer);
                dispatch({ type: `@INIT ${key} reducer` });
            }
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
