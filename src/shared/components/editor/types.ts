export type SurveyData = {
  name: string;
  title: string;
  type: SurveyType;
  defaultValue?: SurveyAnswer;
};

export type SurveyAnswerData = Record<string, SurveyAnswer>;

export type SurveyAnswer = string | boolean;

export type SurveyType = 'text' | 'checkbox' | 'radiogroup' | 'rating' | 'boolean';
