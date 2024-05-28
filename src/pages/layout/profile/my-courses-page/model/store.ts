import { attach, createDomain, sample } from 'effector';
import { createGate } from 'effector-react';

import { Course } from 'entities/course';
import { courseModel } from 'entities/course';

export const Gate = createGate();

const domain = createDomain('pages/profile/courses');

export const getMyCoursesFx = attach({ effect: courseModel.getMyCoursesFx });

export const $courses = domain.store<Course[] | null>(null);

$courses.on(getMyCoursesFx.doneData, (_, courses) => courses);

sample({
  clock: Gate.open,
  target: getMyCoursesFx,
});
