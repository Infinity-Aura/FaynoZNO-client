import { attach, createDomain, sample } from 'effector';
import { createGate } from 'effector-react';

import { courseModel, Course } from 'entities/course';
import { Order, orderModel } from 'entities/order';
import { sessionModel } from 'entities/session';

export const Gate = createGate<string>();

const domain = createDomain('pages/course');

export const getCourseFx = attach({ effect: courseModel.getCourseFx });
export const getOrderByUserFx = attach({ effect: orderModel.getOrderByUserFx });

export const $course = domain.store<Course | null>(null);
export const $courseOrder = domain.store<Order | null>(null);

$course.on(getCourseFx.doneData, (_, course) => course).reset([Gate.close]);

sample({
  clock: Gate.open,
  target: getCourseFx,
});

sample({
  clock: Gate.open,
  source: sessionModel.$user,
  fn: (currentUser, courseId) => ({ userId: currentUser?.id ?? '', courseId }),
  target: getOrderByUserFx,
});

sample({
  clock: getOrderByUserFx.doneData,
  target: $courseOrder,
});

sample({
  clock: orderModel.createOrderFx.done,
  source: {
    currentUser: sessionModel.$user,
    course: $course,
  },
  fn: ({ currentUser, course }) => ({ userId: currentUser?.id ?? '', courseId: course?.id ?? '' }),
  target: getOrderByUserFx,
});
