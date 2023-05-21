import React, { Fragment } from 'react';

import { RouteObject, createBrowserRouter } from 'react-router-dom';

import { RouteItem } from '@interfaces';
import { DashboardLayout, EmptyLayout } from '@layouts';
import { AuthGuard } from '@root/guards';

import { PATH } from './path';

const NotFoundPage = React.lazy(() => import('@pages/not-found'));
const UsersPage = React.lazy(() => import('@pages/users'));

export const routes: RouteItem[] = [
  {
    path: '*',
    component: NotFoundPage,
  },
  {
    path: PATH.root,
    guard: AuthGuard,
    layout: DashboardLayout,
    routes: [
      {
        path: PATH.users,
        component: UsersPage,
        handle: {
          pageTitle: 'pageTitle.monitoringInfrastructure',
        },
      },
    ],
  },
];

export const renderChildren = (children: RouteItem[]): RouteObject[] => {
  return children.reduce((prev: RouteObject[], current) => {
    const RouteComponent = current.component || Fragment;
    const GuardComponent = current.guard || Fragment;
    const LayoutComponent = current.layout || Fragment;
    const LayoutOutlet = current.layout || EmptyLayout;
    const layoutProps = current.layout ? current : {};

    if (current.component) {
      prev.push({
        path: current.path,
        handle: current.handle,
        element: (
          <GuardComponent>
            <LayoutComponent {...layoutProps}>
              <RouteComponent />
            </LayoutComponent>
          </GuardComponent>
        ),
      });
    }

    if (current.routes?.length) {
      prev.push({
        path: current.path,
        handle: current.handle,
        element: (
          <GuardComponent>
            <LayoutOutlet {...layoutProps} />
          </GuardComponent>
        ),
        children: renderChildren(current.routes),
      });
    }

    return prev;
  }, []);
};

export const renderRoutes = (routesData: RouteItem[] = []) =>
  createBrowserRouter(renderChildren(routesData));
