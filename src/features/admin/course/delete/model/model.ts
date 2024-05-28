import { attach, createDomain, sample } from 'effector';
import { courseModel } from 'entities/course';

const domain = createDomain('features/admin/course/delete');

export const deleteCourseRequested = domain.event<string>();

const deleteCourseFx = attach({ effect: courseModel.deleteCourseFx });

sample({
  clock: deleteCourseRequested,
  target: deleteCourseFx,
});
