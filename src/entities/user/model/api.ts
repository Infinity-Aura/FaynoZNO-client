import { http } from 'shared/config';

import { User } from './types';
import { buildUsers } from '../api/builders';

export const createUser = async (user: Partial<User>): Promise<User> => {
  let response;
  try {
    response = await http.post(`/user`, user);
  } catch (error) {
    throw new Error(`Failed to create user: ${error}`);
  }

  return {
    id: response.data._id,
    ...response.data,
  };
};

export const deleteUser = async (userId: string): Promise<User> => {
  let response;
  try {
    response = await http.delete(`/user/${userId}`);
  } catch (error) {
    throw new Error(`Failed to delete user: ${error}`);
  }

  return {
    id: response.data._id,
    ...response.data,
  };
};

export const updateUser = async ({ user }: { user: Partial<User> }): Promise<User> => {
  let response;
  try {
    response = await http.patch(`/user/${user.id}`, user);
  } catch (error) {
    throw new Error(`Failed to update user: ${error}`);
  }

  return {
    id: response.data._id,
    ...response.data,
  };
};

export const getUser = async (userId: string): Promise<User> => {
  let response;
  try {
    response = await http.get(`/user/${userId}`);
  } catch (error) {
    throw new Error(`Failed to update user: ${error}`);
  }

  return {
    id: response.data._id,
    ...response.data,
  };
};

export const getUsers = async (): Promise<User[]> => {
  let response;
  try {
    response = await http.get('/user');
  } catch (error) {
    throw new Error(`Failed to get users: ${error}`);
  }

  let users;
  try {
    users = buildUsers(response.data);
  } catch (error) {
    throw new Error(`Failed to build users: ${error}`);
  }

  return users;
};
