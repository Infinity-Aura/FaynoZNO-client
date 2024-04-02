import { createDomain } from 'effector';

import { updateUser, updateUserPassword, uploadProfileImage } from './api';
import { showFxErrors } from 'shared/ui/lib/notify-user';

const domain = createDomain('entities/profile/settings');

export const userUpdateFx = domain.effect(updateUser);
export const userPasswordUpdateFx = domain.effect(updateUserPassword);
export const uploadProfileImageFx = domain.effect(uploadProfileImage);

showFxErrors([userUpdateFx.failData, userPasswordUpdateFx.failData, uploadProfileImageFx.failData]);
