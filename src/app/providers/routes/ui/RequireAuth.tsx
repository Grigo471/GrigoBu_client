import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { getUserAuthData, getUserRole, UserRole } from '@/entities/User';
import { getRouteArticles, getRouteForbidden } from '@/shared/const/router';

interface RequireAuthProps {
    children: React.ReactElement,
    roles?: UserRole[];
}

export const RequireAuth = ({ children, roles }: RequireAuthProps): JSX.Element => {
    const auth = useSelector(getUserAuthData);
    const location = useLocation();
    const userRole = useSelector(getUserRole);

    const hasRequiredRoles = useMemo(() => {
        if (!roles) return true;

        return roles.some((requiredRole) => userRole === requiredRole);
    }, [roles, userRole]);

    if (!auth) {
        return <Navigate to={getRouteArticles()} state={{ from: location }} replace />;
    }

    if (!hasRequiredRoles) {
        return <Navigate to={getRouteForbidden()} state={{ from: location }} replace />;
    }

    return children;
};
