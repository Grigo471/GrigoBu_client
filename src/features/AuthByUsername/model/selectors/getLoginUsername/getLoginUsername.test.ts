import { DeepPartial } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { getLoginUsername } from './getLoginUsername';

describe('getLoginUsername.test', () => {
    test('should return login username', async () => {
        const state: DeepPartial<StateSchema> = {
            loginForm: {
                username: 'Sergo',
            },
        };
        expect(getLoginUsername(state as StateSchema)).toEqual('Sergo');
    });

    test('should work with empty state', async () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getLoginUsername(state as StateSchema)).toEqual('');
    });
});
