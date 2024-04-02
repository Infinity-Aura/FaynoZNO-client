import { Group, GroupResponse } from '../model/types';

export const buildGroups = (groups: GroupResponse[]): Group[] =>
  groups.map((group) => ({
    ...group,
    id: group._id,
  }));
