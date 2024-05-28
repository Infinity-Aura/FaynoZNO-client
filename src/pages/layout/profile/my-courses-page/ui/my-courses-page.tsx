import React from 'react';
import { useGate, useStore } from 'effector-react';

import { Container, Typography } from 'shared/ui/kit';

import { MyCoursesList } from 'entities/course';

import * as model from '../model';

export const MyCoursesPage = () => {
  useGate(model.Gate);

  const courses = useStore(model.$courses);

  return (
    <Container maxWidth="xl">
      <Typography variant="subtitle1" sx={{ display: 'block', mb: '30px' }}>
        МОЇ КУРСИ
      </Typography>
      <MyCoursesList courses={courses} />
    </Container>
  );
};
