import { Course, CourseResponse, SurveyAnswer, SurveyResponse } from '../model/types';

export const buildCourses = (courses: CourseResponse[]): Course[] =>
  courses.map((course) => ({
    ...course,
    id: course._id,
  }));

export const buildSurveyAnswers = (answers: SurveyResponse[]): SurveyAnswer[] =>
  answers.map((answers) => ({
    ...answers,
    id: answers._id,
  }));
