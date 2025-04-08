export type Mods = Record<string, boolean | string | undefined>

/**
 * Составляет className для компонента из различных классов
 * @param cls - основной класс
 * @param mods - объект из классов, добавляемых по условию, вида { cls: boolean }
 * @param additional - массив дополнительных классов
 * @returns возвращает строку из всех классов, разделенных пробелами
 */
export function classNames(
    cls: string,
    mods: Mods = {},
    additional: Array<string | undefined> = [],
): string {
    return [
        cls,
        ...additional.filter(Boolean),
        ...Object.entries(mods)
            .filter(([className, value]) => Boolean(value))
            .map(([className, value]) => className),
    ]
        .join(' ');
}
