import { memo, Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Navbar } from '@/widgets/Navbar';
import {
    checkAuth,
    getUserAuthData, getUserInited,
    userActions,
} from '@/entities/User';
import { AppRouter } from './providers/routes';
import { useTheme } from '@/shared/lib/hooks/useTheme';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { MainLayout } from '@/shared/layouts/MainLayout';
import { AppLoaderLayout } from '@/shared/layouts/AppLoaderLayout';
import { useAppToolbar } from './lib/useAppToolbar';
import { withTheme } from './providers/ThemeProvider/ui/withTheme';
import { LOCAL_STORAGE_TOKEN_KEY } from '@/shared/const/localStorage';

const App = memo(() => {
    const { theme } = useTheme();

    const dispatch = useAppDispatch();

    const _inited = useSelector(getUserInited);
    const authData = useSelector(getUserAuthData);
    const toolbar = useAppToolbar();

    useEffect(() => {
        if (localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)) {
            dispatch(checkAuth());
        } else {
            dispatch(userActions.setInited());
        }
    }, [dispatch]);

    if (!_inited) {
        return (

            <div id="app" className={classNames('app', {}, [theme])}>
                <AppLoaderLayout />
            </div>

        );
    }

    return (

        <div id="app" className={classNames('app', {}, [theme])}>
            <Suspense fallback="">
                <MainLayout
                    navbar={<Navbar />}
                    content={<AppRouter />}
                    leftbar={toolbar}
                />
            </Suspense>
        </div>

    );
});

export default withTheme(App);
