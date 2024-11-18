import { User } from '@/entities/User';

export interface ProfileCardSchema {
    profileData?: User;
    isSubscribeLoading?: boolean;
    subscribeError?: string;
    isLoading?: boolean;
    error?: string;
}
