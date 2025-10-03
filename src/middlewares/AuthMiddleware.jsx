import React from 'react'
import ls_keys from '../constants/ls-constants'
import { Navigate, Outlet } from 'react-router';

function AuthMiddleware() {
  const auth_Token = localStorage.getItem(ls_keys.AUTH_TOKEN);

  if (auth_Token) {
    return <Outlet />;
  } else {
    return <Navigate to={'/login'} />;
  }
}

export default AuthMiddleware