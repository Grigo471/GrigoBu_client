import { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Navbar } from '@/widgets/Navbar';
import { Sidebar } from '@/widgets/Sidebat';
import { getUserInited, userActions } from '@/entities/User';
import { AppRouter } from './providers/routes';
import { useTheme } from '@/shared/lib/hooks/useTheme';

const App = () => {
    const { theme } = useTheme();

    const dispatch = useDispatch();

    const _inited = useSelector(getUserInited);

    useEffect(() => {
        dispatch(userActions.initAuthData());
    }, [dispatch]);

    return (
        <div className={classNames('app', {}, [theme])}>
            <Suspense fallback="">
                <Navbar />
                <div className="content-page">
                    <Sidebar />
                    {_inited && <AppRouter />}
                </div>
            </Suspense>

        </div>
    );
};

export default App;
