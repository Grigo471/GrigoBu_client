import { createReduxStore, AppDispatch } from './config/store';
import { StoreProvider } from './ui/StoreProvider';
import type {
    StateSchema, ReduxStoreWithManager, ThunkConfig, StateSchemaKey,
} from './config/StateSchema';

export {
    StoreProvider,
    createReduxStore,
    ReduxStoreWithManager,
};

export type {
    AppDispatch, StateSchema, StateSchemaKey, ThunkConfig,
};
