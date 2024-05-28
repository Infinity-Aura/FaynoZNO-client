import React from 'react';
import { Link } from 'react-router-dom';

import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from 'shared/ui/kit';
import { AccessTimeRoundedIcon, FormatListBulletedRoundedIcon } from 'shared/ui/icons';
import { Course, CourseCardType } from '../model/types';
import { API_URL, PATHS } from 'shared/config';
import { isValidFileName } from 'shared/lib/utils';
import NoImage from 'shared/assets/images/no-image.png';

export const CourseCard = ({ course, type }: { course: Course; type: CourseCardType }) => {
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: 460,
        px: '14px',
        pt: '16px',
        pb: '24px',
      }}
    >
      <CardMedia
        component="img"
        alt={course.title}
        height="140"
        image={isValidFileName(course.image) ? `${API_URL}/course/image/${course.image}` : NoImage}
        sx={{ mb: '24px' }}
      />
      <CardContent sx={{ p: 0, mb: '8px', width: '100%' }}>
        <Typography variant="h4" sx={{ fontWeight: 900, mb: '12px' }}>
          {course.title}
        </Typography>
        <Typography variant="body2" sx={{ fontFamily: '"Montserrat", sans-serif', mb: '8px' }}>
          {course.subtitle}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
          <Box>
            <Typography
              variant="body2"
              sx={{ display: 'flex', alignItems: 'center', fontFamily: '"Montserrat", sans-serif' }}
            >
              <FormatListBulletedRoundedIcon fontSize="small" sx={{ mr: '10px' }} />
              {course.lessonsCount} lesson
            </Typography>
          </Box>
          <Box>
            <Typography
              variant="body2"
              sx={{ display: 'flex', alignItems: 'center', fontFamily: '"Montserrat", sans-serif' }}
            >
              <AccessTimeRoundedIcon fontSize="small" sx={{ mr: '10px' }} />
              {course.duration}
            </Typography>
          </Box>
        </Box>
      </CardContent>
      <CardActions sx={{ mt: 'auto', p: 0 }}>
        <Button
          component={Link}
          to={
            type === 'own' ? `${PATHS.profile.course}/${course.id}` : `${PATHS.course}/${course.id}`
          }
          variant="contained"
          sx={{ fontWeight: 900, border: 'none' }}
        >
          {type === 'own' ? 'До курсу' : 'Детальніше'}
        </Button>
      </CardActions>
    </Card>
  );
};
