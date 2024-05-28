import { http, API_URL, AuthRes } from 'shared/config';

import { User } from '../types';
import { buildCourses } from '../../course/api/builders';

export const registration = async ({
  firstName,
  secondName,
  email,
  password,
}: {
  firstName: string;
  secondName: string;
  email: string;
  password: string;
}): Promise<void> => {
  let response;
  try {
    response = await http.post<AuthRes>('/authentication/registration', {
      firstName,
      secondName,
      email,
      password,
    });
  } catch (error) {
    throw new Error(`Failed to register user: ${error}`);
  }

  try {
    localStorage.setItem('access_token', response.data.tokens.accessToken);
    localStorage.setItem('refresh_token', response.data.tokens.refreshToken);
  } catch (error) {
    throw new Error(`Failed to set tokens: ${error}`);
  }
};

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<void> => {
  let response;
  try {
    response = await http.post<AuthRes>('/authentication/login', {
      email,
      password,
    });
  } catch (error) {
    throw new Error(`Failed to login user: ${error}`);
  }

  try {
    localStorage.setItem('access_token', response.data.tokens.accessToken);
    localStorage.setItem('refresh_token', response.data.tokens.refreshToken);
  } catch (error) {
    throw new Error(`Failed to set tokens: ${error}`);
  }
};

export const logout = async (): Promise<void> => {
  try {
    await http.post('/authentication/logout');
  } catch (error) {
    throw new Error(`Failed to logout user: ${error}`);
  }

  try {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  } catch (error) {
    throw new Error(`Failed to remove tokens: ${error}`);
  }
};

export const getCurrentUser = async (): Promise<User> => {
  let user;
  try {
    user = await http.get<User>(`/authentication/user`, {
      withCredentials: true,
    });
  } catch (error) {
    throw new Error(`Failed to get courses: ${error}`);
  }

  if (!user) {
    throw new Error('Authorization error');
  }

  return {
    id: user?.data.id || '',
    firstName: user?.data.firstName || '',
    secondName: user?.data.secondName || '',
    birth: user?.data.birth || '',
    gender: user?.data.gender || '',
    phoneNumber: user?.data.phoneNumber || '',
    email: user?.data.email || '',
    photo: user?.data.photo || '',
    role: user?.data.role || '',
  };
};
