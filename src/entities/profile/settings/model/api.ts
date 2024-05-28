import { http } from 'shared/config';

import { User } from './types';

export const updateUser = async (body: Partial<User>): Promise<User> => {
  let response;
  try {
    response = await http.put('/user', body);
  } catch (error) {
    throw new Error(`Failed to get user: ${error}`);
  }

  return {
    id: response.data._id,
    ...response.data,
  };
};

export const uploadProfileImage = async (photo: File): Promise<User> => {
  let response;
  try {
    response = await http.put(
      '/user/image',
      { photo },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
  } catch (error) {
    throw new Error(`Failed to upload profile image: ${error}`);
  }

  return {
    id: response.data._id,
    ...response.data,
  };
};

export const updateUserPassword = async (body: {
  oldPassword: string;
  newPassword: string;
}): Promise<void> => {
  try {
    await http.put('/auth/reset', body);
  } catch (error) {
    throw new Error(`Failed to update user password: ${error}`);
  }
};
