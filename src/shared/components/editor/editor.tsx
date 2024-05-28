import React from 'react';
import 'survey-core/defaultV2.min.css';
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import { SurveyData } from './types';
import { Box } from 'shared/ui/kit';
import { theme } from './theme';

export const SurveyEditor: React.FC<{
  data: SurveyData[];
  onChange?: (answer: Record<string, string | boolean>) => void;
  preview?: boolean;
}> = ({ data, onChange, preview }) => {
  const survey = new Model({ elements: data });

  survey.applyTheme(theme);

  onChange && survey.onComplete.add(({ data }) => onChange(data));

  return (
    <Box sx={{ pointerEvents: preview ? 'none' : 'auto' }}>
      <Survey model={survey} />
    </Box>
  );
};
