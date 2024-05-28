import { useStore } from 'effector-react';
import React from 'react';

import { Dialog, DialogContent, DialogTitle, MenuItem } from 'shared/ui/kit';

import * as model from '../model';
import { User } from 'entities/session';
import { SurveyData, SurveyEditor } from 'shared/components/editor';
import { SurveyAnswer } from 'entities/course';

const convertToSurveyData = (surveyAnswer: SurveyAnswer) => {
  const answer = surveyAnswer.answer;
  const surveyData = surveyAnswer.surveyData;
  return Object.entries(answer).flatMap(([fieldName, fieldValue]) =>
    surveyData.map((survey) =>
      survey.name === fieldName ? { ...survey, defaultValue: fieldValue } : [],
    ),
  ) as SurveyData[];
};

export const StudentAnswers: React.FC<{ courseId: string; student: User }> = ({
  courseId,
  student,
}) => {
  const [open, setOpen] = React.useState(false);

  const answers = useStore(model.$answers);
  const loading = useStore(model.getUsersFx.pending);

  const handleClickOpen = () => {
    model.answersRequested({ courseId, userId: student.id });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <MenuItem onClick={handleClickOpen}>
        {student.firstName} {student.secondName}
      </MenuItem>
      <Dialog onClose={handleClose} open={open} fullWidth>
        <DialogTitle>Answers</DialogTitle>
        <DialogContent>
          <SurveyEditor data={answers.length ? convertToSurveyData(answers[0]) : []} preview />
        </DialogContent>
      </Dialog>
    </>
  );
};
