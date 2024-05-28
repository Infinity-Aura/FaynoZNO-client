import { attach, createDomain, sample } from 'effector';
import { createGate } from 'effector-react';

import { groupModel } from 'entities/group';
import { courseModel, Course } from 'entities/course';
import { User } from 'entities/session';
import { userModel } from 'entities/user';

export const Gate = createGate();

const domain = createDomain('features/admin/group/create');

export const createGroupRequested = domain.event<Partial<User>>();

const createCourseFx = attach({ effect: groupModel.createGroupFx });
const getCoursesFx = attach({ effect: courseModel.getCoursesFx });
export const getUsersFx = attach({ effect: userModel.getUsersFx });

export const $courses = domain.store<Course[] | null>(null);
export const $students = domain.store<User[] | null>(null);

$courses.on(getCoursesFx.doneData, (_, courses) => courses);
$students.on(getUsersFx.doneData, (_, users) => users.filter((user) => user.role === 'student'));

sample({
  clock: createGroupRequested,
  target: createCourseFx,
});

sample({
  clock: Gate.open,
  fn: () => '',
  target: [getCoursesFx, getUsersFx],
});
