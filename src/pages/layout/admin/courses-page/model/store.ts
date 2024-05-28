import { attach, createDomain, sample } from 'effector';
import { createGate } from 'effector-react';

import { courseModel, Course, SurveyAnswer } from 'entities/course';
import { User } from 'entities/session';
import { userModel } from 'entities/user';

export const Gate = createGate();
export const StudentsGate = createGate<string[]>();

const domain = createDomain('pages/courses');

export const studentsRequested = domain.event<string[]>();
export const answersRequested = domain.event<{ courseId: string; userId: string }>();

export const getCoursesFx = attach({ effect: courseModel.getCoursesFx });
export const getUsersFx = attach({ effect: userModel.getUsersFx });
export const getUserSurveyAnswerFx = attach({ effect: courseModel.getUserSurveyAnswerFx });

export const $courses = domain.store<Course[] | null>(null);
export const $users = domain.store<User[]>([]);
export const $students = domain.store<User[] | null>(null);
export const $answers = domain.store<SurveyAnswer[]>([]);

$courses.on(getCoursesFx.doneData, (_, courses) => courses);

$answers.on(getUserSurveyAnswerFx.doneData, (_, answer) => answer);

$users.on(getUsersFx.doneData, (_, users) => users);

sample({
  clock: Gate.open,
  fn: () => '',
  target: getCoursesFx,
});

sample({
  clock: courseModel.deleteCourseFx.done,
  fn: () => '',
  target: getCoursesFx,
});

sample({
  clock: Gate.open,
  target: getUsersFx,
});

sample({
  clock: studentsRequested,
  source: $users,
  fn: (users, studentsIds) =>
    users.filter(({ id }) => studentsIds.find((studentId) => studentId === id)),
  target: $students,
});

sample({
  clock: answersRequested,
  target: getUserSurveyAnswerFx,
});
