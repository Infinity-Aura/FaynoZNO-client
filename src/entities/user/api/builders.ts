import { User, UserResponse } from '../model/types';

export const buildUsers = (users: UserResponse[]): User[] =>
  users.map((user) => ({
    ...user,
    id: user._id,
  }));
