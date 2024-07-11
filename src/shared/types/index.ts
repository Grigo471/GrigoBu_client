import { memo } from 'react';

export type SortOrder = 'asc' | 'desc';
export const typedMemo: <T>(c: T) => T = memo;
