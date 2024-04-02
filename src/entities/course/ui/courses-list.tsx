import React from 'react';

import { CourseCard } from './course-card';

import { Grid, Typography } from 'shared/ui/kit';

import { Course } from '../model/types';

export const CoursesList: React.FC<{ maxSize?: number; courses: Course[] | null }> = ({
  maxSize = 0,
  courses,
}) => {
  return (
    <Grid container rowSpacing={3} columnSpacing={5.25}>
      {courses?.length ? (
        courses.flatMap((course, index) => {
          return maxSize === 0 || (maxSize > 0 && maxSize > index) ? (
            <Grid key={course.id} item lg={4} md={6} sm={6} xs={12}>
              <CourseCard course={course} type="public" />
            </Grid>
          ) : (
            []
          );
        })
      ) : (
        <Grid item xs={12}>
          <Typography variant="h4" sx={{ fontWeight: 200 }}>
            Немає курсів
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};
