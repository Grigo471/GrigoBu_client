export type NotificationType =
    | 'smbCommented'
    | 'smbAnswered'
    | 'rating'
    | 'subsNumber'
    | 'smbSubscribed';

export interface Notification {
    id: number;
    type: NotificationType;
    name?: string;
    value?: number;
    createdAt: string;
}
