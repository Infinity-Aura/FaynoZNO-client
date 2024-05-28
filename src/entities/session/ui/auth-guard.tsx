import { useStore } from 'effector-react';
import React from 'react';
import { Navigate } from 'react-router-dom';

import { PATHS } from 'shared/config';

import * as model from '../model';

export const AuthGuard: React.FC<{
  children: React.ReactNode;
  auth?: boolean;
  redirectNotAuth?: string;
  redirectAuth?: string;
}> = ({ children, auth, redirectNotAuth = PATHS.login, redirectAuth = PATHS.profile.courses }) => {
  const isAuth = useStore(model.$user);

  if (auth && !isAuth) {
    return <Navigate to={redirectNotAuth} />;
  }

  if (!auth && isAuth) {
    return <Navigate to={redirectAuth} />;
  }

  return <>{children}</>;
};
