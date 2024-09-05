import { StateSchema } from '@/app/providers/StoreProvider';
import { getAuthPassword } from './getAuthPassword';

describe('getLoginPassword.test', () => {
    test('should return login password', async () => {
        const state: DeepPartial<StateSchema> = {
            authForm: {
                password: '123',
            },
        };
        expect(getAuthPassword(state as StateSchema)).toEqual('123');
    });

    test('should work with empty state', async () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getAuthPassword(state as StateSchema)).toEqual('');
    });
});
