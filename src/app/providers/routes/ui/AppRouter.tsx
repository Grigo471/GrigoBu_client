import {
    Suspense, memo, useCallback,
} from 'react';
import { Route, Routes } from 'react-router-dom';
import { RequireAuth } from './RequireAuth';
import { routeConfig } from '../config/routeConfig';
import { AppRoutesProps } from '@/shared/types/router';
import { AppLoaderLayout } from '@/shared/layouts/AppLoaderLayout';

export const AppRouter = memo(() => {
    const renderWithWrapper = useCallback((route: AppRoutesProps) => {
        const element = (
            <Suspense fallback={<AppLoaderLayout />}>
                {route.element}
            </Suspense>
        );

        return (
            <Route
                path={route.path}
                element={route.authOnly ? (
                    <RequireAuth roles={route.roles}>
                        {element}
                    </RequireAuth>
                ) : element}
                key={route.path}
            />
        );
    }, []);

    return (
        <Routes>
            {Object.values(routeConfig).map(renderWithWrapper)}
        </Routes>
    );
});
