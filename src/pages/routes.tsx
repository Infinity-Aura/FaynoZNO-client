import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';

import { PATHS } from 'shared/config';

import { AuthGuard, RoleGuard } from 'entities/session';

import { Layout } from 'pages/layout';
import { NotFoundPage } from 'pages/not-found-page';
import { TeachersPage } from 'pages/layout/teachers-page';
import { LoginPage } from 'pages/layout/login-page';
import { RegistrationPage } from 'pages/layout/registration-page';
import { CoursesPage } from 'pages/layout/courses-page';
import { MyCoursesPage } from 'pages/layout/profile/my-courses-page';
import { MyCoursePage } from 'pages/layout/profile/my-course-page';
import { SettingsLayout } from 'pages/layout/profile/settings-page';
import { SettingsInfoPage } from 'pages/layout/profile/settings-page/info-page';
import { SettingsContactsPage } from 'pages/layout/profile/settings-page/contacts-page';
import { SettingsPasswordPage } from 'pages/layout/profile/settings-page/password-page';
import { CoursePage } from 'pages/layout/course-page';
import { HomePage } from 'pages/layout/home-page';
import { AdminLayout } from './layout/admin/admin-layout';
import { AdminCoursesPage } from './layout/admin/courses-page';
import { AdminOrdersPage } from './layout/admin/orders-page';
import { AdminUsersPage } from './layout/admin/users-page';
import { AdminGroupsPage } from './layout/admin/groups-page';

const routesMap = [
  {
    path: PATHS.root,
    element: <Layout />,
    children: [
      {
        path: PATHS.root,
        element: <HomePage />,
      },
      {
        path: PATHS.about,
        element: <div>about</div>,
      },
      {
        path: PATHS.teachers,
        element: <TeachersPage />,
      },
      {
        path: PATHS.courses,
        element: <CoursesPage />,
      },
      {
        path: PATHS.course + '/:courseId',
        element: <CoursePage />,
      },
      {
        path: PATHS.login,
        element: (
          <AuthGuard auth={false}>
            <LoginPage />
          </AuthGuard>
        ),
      },
      {
        path: PATHS.registration,
        element: <RegistrationPage />,
      },
      {
        path: PATHS.profile.root,
        element: <Navigate to={PATHS.profile.courses} />,
      },
      {
        path: PATHS.profile.courses,
        element: (
          <AuthGuard auth={true}>
            <MyCoursesPage />
          </AuthGuard>
        ),
      },
      {
        path: PATHS.profile.course + '/:courseId',
        element: (
          <AuthGuard auth={true}>
            <MyCoursePage />
          </AuthGuard>
        ),
      },
      {
        path: PATHS.profile.settings.root,
        element: (
          <AuthGuard auth={true}>
            <SettingsLayout />
          </AuthGuard>
        ),
        children: [
          {
            path: PATHS.profile.settings.info,
            element: <SettingsInfoPage />,
          },
          {
            path: PATHS.profile.settings.contacts,
            element: <SettingsContactsPage />,
          },
          {
            path: PATHS.profile.settings.password,
            element: <SettingsPasswordPage />,
          },
        ],
      },
      {
        path: PATHS.admin.root,
        element: (
          <RoleGuard roles={['admin', 'moderator']}>
            <AdminLayout />
          </RoleGuard>
        ),
        children: [
          {
            path: PATHS.admin.courses,
            element: <AdminCoursesPage />,
          },
          {
            path: PATHS.admin.users,
            element: <AdminUsersPage />,
          },
          {
            path: PATHS.admin.groups,
            element: <AdminGroupsPage />,
          },
          {
            path: PATHS.admin.orders,
            element: <AdminOrdersPage />,
          },
        ],
      },
    ],
  },
  {
    path: PATHS.notFound.root,
    element: <NotFoundPage />,
  },
];

export const Routes: React.FC = () => useRoutes(routesMap);
