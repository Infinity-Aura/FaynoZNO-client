import { attach, createDomain, sample } from 'effector';
import { createGate } from 'effector-react';

import { Course } from 'entities/course';
import { courseModel } from 'entities/course';
import { sessionModel } from 'entities/session';

export const Gate = createGate();

const domain = createDomain('pages/courses');

export const getCoursesFx = attach({ effect: courseModel.getCoursesFx });

export const $courses = domain.store<Course[] | null>(null);

$courses.on(getCoursesFx.doneData, (_, courses) => courses);

sample({
  clock: Gate.open,
  source: sessionModel.$user,
  fn: (user) => user?.id ?? '',
  target: getCoursesFx,
});
