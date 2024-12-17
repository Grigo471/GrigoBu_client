export type NotificationType = 'comment' | 'answer' | 'rating' | 'subscribers';

export interface Notification {
    id: number;
    type: NotificationType;
    name?: string;
    value?: number;
}
