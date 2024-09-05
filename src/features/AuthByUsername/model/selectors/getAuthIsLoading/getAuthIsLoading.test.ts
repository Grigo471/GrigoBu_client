import { StateSchema } from '@/app/providers/StoreProvider';
import { getAuthIsLoading } from './getAuthIsLoading';

describe('getLoginIsLoading.test', () => {
    test('should return true', async () => {
        const state: DeepPartial<StateSchema> = {
            authForm: {
                isLoading: true,
            },
        };
        expect(getAuthIsLoading(state as StateSchema)).toEqual(true);
    });

    test('should work with empty state', async () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getAuthIsLoading(state as StateSchema)).toEqual(false);
    });
});
