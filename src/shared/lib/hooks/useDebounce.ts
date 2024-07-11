import {
    MutableRefObject, useCallback, useRef,
} from 'react';

/**
 *Хук, отменяющий предыдущий вызов функции, пока не истечет delay
 * @param callback
 * @param delay
 * @returns
 */

export function useDebounce(callback: (...args: any[]) => void, delay: number) {
    const timer = useRef() as MutableRefObject<any>;

    return useCallback((...args: any[]) => {
        if (timer.current) {
            clearTimeout(timer.current);
        }

        timer.current = setTimeout(() => {
            callback();
        }, delay);
    }, [callback, delay]);
}
