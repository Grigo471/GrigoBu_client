import { classNames } from './classNames';

describe('classNames', () => {
    test('with only fisrt param', () => {
        expect(classNames('someClass')).toBe('someClass');
    });

    test('with additional class', () => {
        const expected = 'someClass class1 class2';
        expect(classNames('someClass', {}, ['class1', 'class2']))
            .toBe(expected);
    });

    test('with mods', () => {
        const expected = 'someClass class1 class2 mod1';
        expect(classNames(
            'someClass',
            { mod1: true, mod2: true },
            ['class1', 'class2'],
        ))
            .toBe(expected);
    });

    test('with mods false', () => {
        const expected = 'someClass class1 class2 mod1';
        expect(classNames(
            'someClass',
            { mod1: true, mod2: false },
            ['class1', 'class2'],
        ))
            .toBe(expected);
    });

    test('with mods undefined', () => {
        const expected = 'someClass class1 class2 mod1';
        expect(classNames(
            'someClass',
            { mod1: true, mod2: undefined },
            ['class1', 'class2'],
        ))
            .toBe(expected);
    });
});
