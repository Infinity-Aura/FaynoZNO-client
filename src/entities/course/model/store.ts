import { createDomain } from 'effector';

import { showFxErrors } from 'shared/ui/lib/notify-user';

import {
  createCourse,
  deleteCourse,
  getCourse,
  getCourses,
  getMyCourses,
  getUserSurveyAnswers,
  saveSurveyAnswer,
  uploadMedia,
  uploadDocuments,
  uploadImage,
} from './api';

const domain = createDomain('entities/course');

export const getCoursesFx = domain.effect(getCourses);
export const getCourseFx = domain.effect(getCourse);
export const getMyCoursesFx = domain.effect(getMyCourses);
export const createCourseFx = domain.effect(createCourse);
export const deleteCourseFx = domain.effect(deleteCourse);

export const getUserSurveyAnswerFx = domain.effect(getUserSurveyAnswers);
export const saveSurveyAnswerFx = domain.effect(saveSurveyAnswer);
export const uploadMediaFx = domain.effect(uploadMedia);
export const uploadDocumentsFx = domain.effect(uploadDocuments);
export const uploadImageFx = domain.effect(uploadImage);

showFxErrors([
  createCourseFx.failData,
  deleteCourseFx.failData,
  getCoursesFx.failData,
  getCourseFx.failData,
  getMyCoursesFx.failData,
  getUserSurveyAnswerFx.failData,
  saveSurveyAnswerFx.failData,
  uploadMediaFx.failData,
  uploadDocumentsFx.failData,
  uploadImageFx.failData,
]);
