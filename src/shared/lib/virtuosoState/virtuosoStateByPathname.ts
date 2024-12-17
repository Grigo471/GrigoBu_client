import { StateSnapshot } from 'react-virtuoso';

export const virtuosoStateByPathname: Record<string, StateSnapshot | undefined> = {};
export const resetVirtuosoStateByPath = (pathname: string) => {
    virtuosoStateByPathname[pathname] = undefined;
};

export const resetAllVirtuosoState = () => {
    Object.keys(virtuosoStateByPathname)
        .forEach((key) => { virtuosoStateByPathname[key] = undefined; });
};

export const getVirtuosoStateByPathname = (pathname: string) => virtuosoStateByPathname[pathname];
export const setVirtuosoStateByPathname = (pathname: string, state: StateSnapshot) => {
    virtuosoStateByPathname[pathname] = state;
};
