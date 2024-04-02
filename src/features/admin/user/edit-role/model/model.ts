import { attach, createDomain, sample } from 'effector';
import { createGate } from 'effector-react';
import { Role, User, userModel } from 'entities/user';
import { notifySuccess } from 'shared/lib/notify';

const domain = createDomain('features/admin/user/edit-role');

export const Gate = createGate<string>();

export const closeDialogRequested = domain.event();
export const editUserRoleRequested = domain.event<string>();
export const saveUserRoleRequested = domain.event<Role>();

const getUserFx = attach({ effect: userModel.getUserFx });
const updateUserRoleFx = attach({ effect: userModel.updateUserRoleFx });

const notifySuccessfulCreationFx = domain.effect(() =>
  notifySuccess("User's role changed successfully!"),
);

export const $openDialog = domain.store<boolean>(false);
export const $selectedUser = domain.store<User | null>(null);

$openDialog
  .on(editUserRoleRequested, () => true)
  .reset([closeDialogRequested, updateUserRoleFx.doneData]);
$selectedUser.on(getUserFx.doneData, (_, user) => user);

sample({
  clock: Gate.open,
  target: getUserFx,
});

sample({
  clock: saveUserRoleRequested,
  source: $selectedUser,
  filter: (user) => !!user,
  fn: (user, role) => ({ userId: user?.id ?? '', role }),
  target: updateUserRoleFx,
});

sample({
  clock: updateUserRoleFx.doneData,
  target: notifySuccessfulCreationFx,
});
