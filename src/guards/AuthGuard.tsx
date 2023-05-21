import { useKeycloak } from '@react-keycloak/web';
import { useLocation, Navigate } from 'react-router-dom';

import { LoadingScreen } from '@root/components';
import { ParentComponentProps } from '@root/interfaces';
import { getUsersPath } from '@root/utils/path-helper';

export default function AuthGuard({ children }: ParentComponentProps) {
  // const { initialized } = useKeycloak();
  const { pathname } = useLocation();

  // if (!initialized) {
  //   return <LoadingScreen />;
  // }

  if (pathname === '/') {
    return <Navigate to={getUsersPath()} />;
  }

  return children;
}
