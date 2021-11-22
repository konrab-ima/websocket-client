import React from 'react';
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({element: Component}) => {
    const isLoggedIn = !!localStorage.getItem('name');
    if (!isLoggedIn) {
        return <Navigate to="/"/>;
    }
    return Component;
}

export default PrivateRoute;
