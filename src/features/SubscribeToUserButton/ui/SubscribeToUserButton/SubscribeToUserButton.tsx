import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './SubscribeToUserButton.module.scss';
import { Button } from '@/shared/ui/Button';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { subscribeToUser } from '../../model/services/subscribeToUser';
import { unsubscribeToUser } from '../../model/services/unsubscribeToUser';
import { classNames } from '@/shared/lib/classNames/classNames';
import { uiFlags } from '@/shared/lib/ui/lib/UIFlags';

interface SubscribeToUserButtonProps {
   className?: string;
   userId: number;
   amISubscribed?: boolean;
}

export const SubscribeToUserButton = memo((props: SubscribeToUserButtonProps) => {
    const { className, userId, amISubscribed } = props;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const onSubscribe = useCallback(async () => {
        setIsLoading(true);
        await dispatch(subscribeToUser(userId));
        setIsLoading(false);
        uiFlags.shouldSubscriptionsPageRefresh = true;
    }, [dispatch, userId]);

    const onUnSubscribe = useCallback(async () => {
        setIsLoading(true);
        await dispatch(unsubscribeToUser(userId));
        setIsLoading(false);
        uiFlags.shouldSubscriptionsPageRefresh = true;
    }, [dispatch, userId]);

    const subscribeButton = amISubscribed ? (
        <Button
            className={classNames(cls.subscribeButton, {}, [className])}
            onClick={onUnSubscribe}
            disabled={isLoading}
            variant="filled"
        >
            {t('Вы подписаны')}
        </Button>
    ) : (
        <Button
            className={className}
            disabled={isLoading}
            onClick={onSubscribe}
        >
            {t('Подписаться')}
        </Button>
    );

    return subscribeButton;
});
