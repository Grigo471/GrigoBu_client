import { getQueryParams } from './addQueryParams';

describe('shared/lib/addQueryParams', () => {
    test('with one param', () => {
        const params = getQueryParams({
            test: 'value',
        });
        expect(params).toBe('?test=value');
    });
    test('with many params', () => {
        const params = getQueryParams({
            test: 'value',
            second: '2',
        });
        expect(params).toBe('?test=value&second=2');
    });
    test('with undefined', () => {
        const params = getQueryParams({
            test: 'value',
            second: undefined,
        });
        expect(params).toBe('?test=value');
    });
});
