import { User } from '@/entities/User';
import { rtkApi } from '@/shared/api/rtkApi';

export const subscriptionsUsersApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getSubscriptionsUsers: build.query<User[], void>({
            query: () => ({
                url: 'users/subscriptions',
                params: {
                    sort: 'rating',
                    order: 'desc',
                    search: '',
                },
            }),
        }),
    }),
});

export const useGetSubscriptionsUsers = subscriptionsUsersApi.useGetSubscriptionsUsersQuery;
