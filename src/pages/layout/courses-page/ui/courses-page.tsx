import React from 'react';
import { useGate, useStore } from 'effector-react';

import { Container, Typography } from 'shared/ui/kit';
import { CoursesList } from 'entities/course';

import PigImg from 'shared/assets/images/pig_1.svg';
import BgFiguresImg from 'shared/assets/images/bg_figures_1.svg';

import * as model from '../model';

export const CoursesPage = () => {
  useGate(model.Gate);

  const courses = useStore(model.$courses);

  return (
    <Container
      maxWidth="xl"
      sx={{
        position: 'relative',
        '&:before': {
          content: '""',
          display: { md: 'block', xs: 'none' },
          backgroundImage: `url('${BgFiguresImg}')`,
          width: '1451px',
          height: '802px',
          position: 'absolute',
          zIndex: '-1',
          top: '0',
          right: '85%',
        },
      }}
    >
      <Typography
        variant="h2"
        sx={{
          position: 'relative',
          display: 'inline-block',
          mb: '55px',
          whiteSpace: 'nowrap',
          fontSize: {
            lg: '64px',
            xs: 'calc(32px + 20 * ((100vw - 380px) / (1125 - 380)))',
          },
          lineHeight: 'calc(39px + 24 * ((100vw - 380px) / (1125 - 380)))',
          '&:before': {
            content: '"СПИСОК КУРСІВ"',
            position: 'absolute',
            zIndex: '-1',
            top: '40%',
            left: '20%',
            color: 'white',
            whiteSpace: 'nowrap',
            textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
          },
          '&:after': {
            content: '""',
            backgroundImage: `url('${PigImg}')`,
            backgroundSize: 'contain',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed',
            transform: 'rotate(21deg)',
            width: { xl: '162px', lg: '142px', md: '122px', sm: '102px', xs: '82px' },
            height: { xl: '212px', lg: '192px', md: '172px', sm: '152px', xs: '132px' },
            position: 'absolute',
            zIndex: '-1',
            bottom: { sm: '-100%', xs: '-300%' },
            right: { sm: '-50%', xs: '-20%' },
          },
        }}
      >
        СПИСОК КУРСІВ
      </Typography>
      <CoursesList courses={courses} />
    </Container>
  );
};
