import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isUserLoggedIn } from '../../utils/authHelpers';

const PrivateRoute = () => {
    return (
        isUserLoggedIn() ? <Outlet /> : <Navigate to="/login" />
    );
};

const PublicRoute = ({restrictedToPublicOnly}) => {

    return (
        isUserLoggedIn() && restrictedToPublicOnly ? <Navigate to="/home" /> : <Outlet />
    );
};


export { PrivateRoute, PublicRoute };
