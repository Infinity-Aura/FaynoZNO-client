import React from 'react';

import { CourseCard } from './course-card';

import { Grid, Typography } from 'shared/ui/kit';

import { Course } from '../model/types';

export const MyCoursesList: React.FC<{ courses: Course[] | null }> = ({ courses }) => {
  return (
    <Grid container rowSpacing={3} columnSpacing={5.25}>
      {courses?.length ? (
        courses.map((course) => (
          <Grid key={course.id} item lg={4} md={6} sm={6} xs={12}>
            <CourseCard course={course} type="own" />
          </Grid>
        ))
      ) : (
        <Grid item xs={12}>
          <Typography variant="h4" sx={{ fontWeight: 200 }}>
            Немає придбаних курсів
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};
