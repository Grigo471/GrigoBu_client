import { getUserAuthData } from 'entities/User';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { RoutePaths } from 'shared/config/routeConfig/routeConfig';

interface RequireAuthProps {
    children: React.ReactElement,
}

export const RequireAuth = ({ children }: RequireAuthProps): JSX.Element => {
    const auth = useSelector(getUserAuthData);
    const location = useLocation();

    if (!auth) {
        return <Navigate to={RoutePaths.main} state={{ from: location }} replace />;
    }

    return children;
};
