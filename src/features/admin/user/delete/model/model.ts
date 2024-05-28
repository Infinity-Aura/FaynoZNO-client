import { attach, createDomain, sample } from 'effector';
import { userModel } from 'entities/user';

const domain = createDomain('features/admin/user/delete');

export const deleteUserRequested = domain.event<string>();

const deleteUserFx = attach({ effect: userModel.deleteUserFx });

sample({
  clock: deleteUserRequested,
  target: deleteUserFx,
});
