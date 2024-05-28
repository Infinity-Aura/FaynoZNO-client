import { SurveyAnswerData, SurveyData } from 'shared/components/editor';

export type CourseCardType = 'public' | 'own';

export type CourseResponse = Course & { _id: string };

export type Course = {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  lessonsCount: number;
  duration: string;
  description: CourseDescription;
  blocks: Array<CourseBlock>;
  teachers: Array<string>;
  students: Array<string>;
  media: { name: string; link: string; type: string }[];
  cost: CourseCost;
};

export type CourseBlock = {
  title: string;
  subtitle: string;
  video: string;
  document: string;
  survey: string;
  surveyData: SurveyData[];
};

export type CourseCost = {
  oldPrice: number;
  newPrice: number;
};

export type CourseDescription = {
  info: Array<CourseDescriptionInfo>;
};

export type CourseDescriptionInfo = {
  title: string;
  subtitle: string;
};

export type SurveyResponse = SurveyAnswer & { _id: string };

export type SurveyAnswer = {
  answer: Record<string, string | boolean>;
  blockTitle: string;
  courseId: string;
  surveyData: SurveyData[];
  userId: string;
};

export type SurveyResult = {
  courseId: string;
  blockTitle: string;
  answer: SurveyAnswerData;
};
