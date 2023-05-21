import { Suspense, useEffect } from 'react';

import { ReactKeycloakProvider } from '@react-keycloak/web';
import { ConfigProvider } from 'antd';
import { ErrorBoundary } from 'react-error-boundary';
import { RouterProvider } from 'react-router-dom';

import { LoadingScreen } from '@components';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@constants';
import { storageService } from '@services';

import keycloak from './keycloak-config';
import { renderRoutes, routes } from './routes/routes';

function App() {
  useEffect(() => {
    storageService.init();
  }, []);

  const tokenLogger = (token: Record<string, any>) => {
    if (token && Object.keys(token || {}).length) {
      storageService.set(ACCESS_TOKEN, token.token || '');
      storageService.set(REFRESH_TOKEN, token.refreshToken || '');
    } else {
      storageService.remove(ACCESS_TOKEN);
      storageService.remove(REFRESH_TOKEN);
    }
  };

  return (
    // <ReactKeycloakProvider
    //   authClient={keycloak}
    //   onTokens={tokenLogger}
    //   initOptions={{
    //     onLoad: 'login-required',
    //     checkLoginIframe: false,
    //   }}
    // >
    <ConfigProvider
      theme={{
        token: {
          fontFamily: `'Montserrat', 'Helvetica', 'Arial', serif`,
          colorText: '#6E6B7B',
        },
      }}
    >
      <Suspense fallback={<LoadingScreen />}>
        <RouterProvider router={renderRoutes(routes)} />
      </Suspense>
    </ConfigProvider>
    // </ReactKeycloakProvider>
  );
}

export default App;
