import { User } from '@/entities/User';

export interface ProfileCardSchema {
    profileData?: User;
    amISubscribed?: boolean;
    isSubscribeLoading?: boolean;
    subscribeError?: string;
    isLoading?: boolean;
    error?: string;
}
