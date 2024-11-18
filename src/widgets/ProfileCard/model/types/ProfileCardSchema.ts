import { User } from '@/entities/User';

export interface ProfileCardSchema {
    profileData?: User;
    isLoading?: boolean;
    error?: string;
}
