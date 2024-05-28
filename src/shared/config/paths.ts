import { createEffect } from 'effector';
import { NavigateFunction } from 'react-router-dom';

let navigateFunc: NavigateFunction | null = null;
export const setNavigate = (navigate: NavigateFunction): void => void (navigateFunc = navigate);
export const navigateTo = (path: string): void => navigateFunc?.(path);
export const navigateToFx = createEffect(navigateTo);

export const PATHS = {
  root: '/',
  about: '/about',
  teachers: '/teachers',
  courses: '/courses',
  course: '/course',
  login: '/login',
  registration: '/registration',
  profile: {
    root: '/profile',
    courses: '/profile/courses',
    course: '/profile/course',
    settings: {
      root: '/profile/settings',
      info: '/profile/settings/info',
      contacts: '/profile/settings/contacts',
      password: '/profile/settings/password',
    },
  },
  admin: {
    root: '/admin',
    orders: '/admin/orders',
    courses: '/admin/courses',
    teachers: '/admin/teachers',
    students: '/admin/students',
    groups: '/admin/groups',
  },
  notFound: {
    root: '*',
  },
} as const;

export const PAGES = [
  { name: 'Про нас', root: '/#about' },
  { name: 'Хто навчає?', root: '/#teachers' },
  { name: 'Курси', root: '/courses' },
];
