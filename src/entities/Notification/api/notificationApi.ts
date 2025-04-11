import { rtkApi } from '@/shared/api/rtkApi';
import { Notification } from '../model/types/notification';

const notificationApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getNotifications: build.query<Notification[], null>({
            query: () => ({
                url: '/notifications',
            }),
            providesTags: ['Notifications'],
        }),
        getNotificationsCount: build.query<number, null>({
            query: () => ({
                url: '/notifications/count',
            }),
        }),
        viewNotifications: build.mutation<Notification[], void>({
            query: () => ({
                url: '/notifications',
                method: 'POST',
            }),
            invalidatesTags: ['Notifications'],
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(
                        notificationApi.util
                            .updateQueryData('getNotificationsCount', null, (draft) => 0),
                    );
                } catch (error) {
                    console.log(error);
                }
            },
        }),
    }),
});

export const useGetNotificationsList = notificationApi.useGetNotificationsQuery;
export const useGetNotificationsCount = notificationApi.useGetNotificationsCountQuery;
export const useViewNotifications = notificationApi.useViewNotificationsMutation;
