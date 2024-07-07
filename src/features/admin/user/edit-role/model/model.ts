import { attach, createDomain, sample } from 'effector';
import { userModel } from 'entities/user';

const domain = createDomain('features/admin/user/delete');

export const editUserRoleRequested = domain.event<string>();

const updateUserFx = attach({ effect: userModel.updateUserFx });

sample({
  clock: editUserRoleRequested,
  fn: (userId) => ({ user: { id: userId } }),
  target: updateUserFx,
});
