import { EntityState } from '@reduxjs/toolkit';
import { User, UsersSortField } from '@/entities/User';
import { SortOrder } from '@/shared/types';

export interface UsersPageSchema extends EntityState<User> {
    isLoading?: boolean;
    error?: string;
    // filters
    order: SortOrder;
    sort: UsersSortField;
    search: string;
}
