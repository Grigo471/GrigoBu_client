import { EntityState } from '@reduxjs/toolkit';
import { User } from '@/entities/User';

export interface UsersPageSchema extends EntityState<User> {
    isLoading?: boolean;
    error?: string;
}
