import { StateSchema } from '@/app/providers/StoreProvider';
import { getAuthError } from './getAuthError';

describe('getLoginError.test', () => {
    test('should return login error', async () => {
        const state: DeepPartial<StateSchema> = {
            authForm: {
                error: 'error',
            },
        };
        expect(getAuthError(state as StateSchema)).toEqual('error');
    });

    test('should work with empty state', async () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getAuthError(state as StateSchema)).toEqual(undefined);
    });
});
