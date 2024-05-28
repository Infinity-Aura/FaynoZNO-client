import { http } from 'shared/config';

import { Group } from './types';
import { buildGroups } from '../api/builders';

export const getGroups = async (): Promise<Group[]> => {
  let response;
  try {
    response = await http.get('/group');
  } catch (error) {
    throw new Error(`Failed to get groups: ${error}`);
  }

  let groups;
  try {
    groups = buildGroups(response.data);
  } catch (error) {
    throw new Error(`Failed to build groups: ${error}`);
  }

  return groups;
};

export const getGroup = async (groupId: string): Promise<Group> => {
  let response;
  try {
    response = await http.get(`/group/${groupId}`);
  } catch (error) {
    throw new Error(`Failed to get group: ${error}`);
  }

  return {
    id: response.data._id,
    ...response.data,
  };
};

export const getMyGroups = async (): Promise<Group[]> => {
  let response;
  try {
    response = await http.get(`/group/own`);
  } catch (error) {
    throw new Error(`Failed to get my groups: ${error}`);
  }

  let groups;
  try {
    groups = buildGroups(response.data);
  } catch (error) {
    throw new Error(`Failed to build groups: ${error}`);
  }

  return groups;
};

export const createGroup = async (group: Partial<Group>): Promise<Group> => {
  let response;
  try {
    response = await http.post(`/group`, group);
  } catch (error) {
    throw new Error(`Failed to create course: ${error}`);
  }

  return {
    id: response.data._id,
    ...response.data,
  };
};

export const deleteGroup = async (groupId: string): Promise<Group> => {
  let response;
  try {
    response = await http.delete(`/group/${groupId}`);
  } catch (error) {
    throw new Error(`Failed to delete course: ${error}`);
  }

  return {
    id: response.data._id,
    ...response.data,
  };
};
