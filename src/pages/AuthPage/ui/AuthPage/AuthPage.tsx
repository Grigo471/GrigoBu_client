import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import cls from './AuthPage.module.scss';
import { AuthForm } from '@/features/AuthByUsername';
import { getUserAuthData } from '@/entities/User';
import { Page } from '@/widgets/Page';
import { Card } from '@/shared/ui/Card';

// interface LocationState {
//    from?: Location;
// }

export const AuthPage = memo(() => {
    const { t } = useTranslation();
    const auth = useSelector(getUserAuthData);
    const location = useLocation();
    //  const state = location.state as LocationState;

    if (auth) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return (
        <Page className={cls.AuthPage}>
            <Card className={cls.card} padding="24">
                <AuthForm />
            </Card>
        </Page>
    );
});
