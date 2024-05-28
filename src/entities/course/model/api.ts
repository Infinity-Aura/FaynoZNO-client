import { http } from 'shared/config';

import { Course, SurveyAnswer, SurveyResult } from './types';
import { buildCourses, buildSurveyAnswers } from '../api/builders';

export const getCourses = async (userId: string): Promise<Course[]> => {
  let response;
  try {
    response = userId
      ? await http.get(`/course/public/students`)
      : await http.get(`/course/public`);
  } catch (error) {
    throw new Error(`Failed to get courses: ${error}`);
  }

  let courses;
  try {
    courses = buildCourses(response.data);
  } catch (error) {
    throw new Error(`Failed to build courses: ${error}`);
  }

  return courses;
};

export const getCourse = async (courseId: string): Promise<Course> => {
  let response;
  try {
    response = await http.get(`/course/public/${courseId}`);
  } catch (error) {
    throw new Error(`Failed to get course: ${error}`);
  }

  return {
    id: response.data._id,
    ...response.data,
  };
};

export const getMyCourses = async (): Promise<Course[]> => {
  let response;
  try {
    response = await http.get(`/course/own`);
  } catch (error) {
    throw new Error(`Failed to get my courses: ${error}`);
  }

  let courses;
  try {
    courses = buildCourses(response.data);
  } catch (error) {
    throw new Error(`Failed to build courses: ${error}`);
  }

  return courses;
};

export const createCourse = async (course: Partial<Course>): Promise<Course> => {
  let response;
  try {
    response = await http.post(`/course`, course);
  } catch (error) {
    throw new Error(`Failed to create course: ${error}`);
  }

  return {
    id: response.data._id,
    ...response.data,
  };
};

export const uploadMedia = async (params: { courseId: string; media: File[] }): Promise<Course> => {
  let response;
  try {
    response = await http.put(
      `/course/media`,
      { [params.courseId]: params.media },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
  } catch (error) {
    throw new Error(`Failed to upload media: ${error}`);
  }

  return {
    id: response.data._id,
    ...response.data,
  };
};

export const uploadDocuments = async (params: {
  courseId: string;
  documents: File[];
}): Promise<Course> => {
  let response;
  try {
    response = await http.put(
      `/course/documents`,
      { [params.courseId]: params.documents },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
  } catch (error) {
    throw new Error(`Failed to upload documents: ${error}`);
  }

  return {
    id: response.data._id,
    ...response.data,
  };
};

export const uploadImage = async (params: { courseId: string; image: File }): Promise<Course> => {
  let response;
  try {
    response = await http.put(
      `/course/image/${params.courseId}`,
      { image: params.image },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
  } catch (error) {
    throw new Error(`Failed to upload image: ${error}`);
  }

  return {
    id: response.data._id,
    ...response.data,
  };
};

export const saveSurveyAnswer = async (surveyResult: SurveyResult): Promise<SurveyResult> => {
  let response;
  try {
    response = await http.post(`/answer`, surveyResult);
  } catch (error) {
    throw new Error(`Failed to save survey answer: ${error}`);
  }

  return response.data;
};

export const getUserSurveyAnswers = async ({
  courseId,
  userId,
}: {
  courseId: string;
  userId: string;
}): Promise<SurveyAnswer[]> => {
  let response;
  try {
    response = await http.get(`/answer/course/${courseId}/user/${userId}`);
  } catch (error) {
    throw new Error(`Failed to get user survey answers: ${error}`);
  }

  let surveyAnswers;
  try {
    surveyAnswers = buildSurveyAnswers(response.data);
  } catch (error) {
    throw new Error(`Failed to build survey answers: ${error}`);
  }

  return surveyAnswers;
};

export const deleteCourse = async (courseId: string): Promise<Course> => {
  let response;
  try {
    response = await http.delete(`/course/${courseId}`);
  } catch (error) {
    throw new Error(`Failed to delete course: ${error}`);
  }

  return {
    id: response.data._id,
    ...response.data,
  };
};
