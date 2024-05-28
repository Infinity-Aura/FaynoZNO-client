import { attach, createDomain, sample } from 'effector';
import { createGate } from 'effector-react';

import { Course } from 'entities/course';
import { courseModel } from 'entities/course';

export const Gate = createGate<string>();

const domain = createDomain('pages/profile/course');

export const getCourseFx = attach({ effect: courseModel.getCourseFx });

export const $course = domain.store<Course | null>(null);

$course.on(getCourseFx.doneData, (_, course) => course);

sample({
  clock: Gate.open,
  target: getCourseFx,
});
