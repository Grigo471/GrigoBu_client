import { StateSchema } from '@/app/providers/StoreProvider';
import { getAuthApiError } from './getAuthApiError';

describe('getLoginError.test', () => {
    test('should return login error', async () => {
        const state: DeepPartial<StateSchema> = {
            authForm: {
                apiError: 'Wrong password',
            },
        };
        expect(getAuthApiError(state as StateSchema)).toEqual('error');
    });

    test('should work with empty state', async () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getAuthApiError(state as StateSchema)).toEqual(undefined);
    });
});
