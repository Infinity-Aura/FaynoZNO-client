import React from 'react';
import { useParams } from 'react-router-dom';
import { useGate, useStore } from 'effector-react';

import { MyCourse } from 'entities/course';

import { Container, Typography } from 'shared/ui/kit';
import { Loading } from 'shared/components/loading';

import * as model from '../model';
import { courseCreateModel } from 'features/course/create';

export const MyCoursePage = () => {
  const { courseId } = useParams();
  useGate(model.Gate, courseId);

  const course = useStore(model.$course);

  return (
    <Container maxWidth="xl">
      <Typography variant="subtitle1" sx={{ display: 'block', mb: '30px' }}>
        МОЇ КУРСИ
      </Typography>
      {course ? (
        <MyCourse
          course={course}
          onSurveySave={(result) => courseCreateModel.saveSurveyAnswerRequested(result)}
        />
      ) : (
        <Loading />
      )}
    </Container>
  );
};
