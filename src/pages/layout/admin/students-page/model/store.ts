import { attach, createDomain, sample } from 'effector';
import { createGate } from 'effector-react';

import { User, userModel } from 'entities/user';

export const Gate = createGate();

const domain = createDomain('pages/admin/students');

export const getUsersFx = attach({ effect: userModel.getUsersFx });

export const $students = domain.store<User[] | null>(null);

$students.on(getUsersFx.doneData, (_, users) => users.filter((user) => user.role === 'student'));

sample({
  clock: Gate.open,
  target: getUsersFx,
});

sample({
  clock: [userModel.deleteUserFx.done],
  target: getUsersFx,
});
