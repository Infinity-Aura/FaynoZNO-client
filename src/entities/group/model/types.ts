export type GroupResponse = Group & { _id: string };

export type Group = {
  id: string;
  title: string;
  number: number;
  studentsIds: string[];
  coursesIds: string[];
};
