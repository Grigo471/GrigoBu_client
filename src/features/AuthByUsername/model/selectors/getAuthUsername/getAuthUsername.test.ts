import { StateSchema } from '@/app/providers/StoreProvider';
import { getAuthUsername } from './getAuthUsername';

describe('getLoginUsername.test', () => {
    test('should return login username', async () => {
        const state: DeepPartial<StateSchema> = {
            authForm: {
                username: 'Sergo',
            },
        };
        expect(getAuthUsername(state as StateSchema)).toEqual('Sergo');
    });

    test('should work with empty state', async () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getAuthUsername(state as StateSchema)).toEqual('');
    });
});
