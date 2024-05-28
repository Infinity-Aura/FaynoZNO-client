import React from 'react';
import { useParams } from 'react-router-dom';
import { useGate, useStore } from 'effector-react';

import { Box, Container, Grid, List, ListItem, ListItemIcon, Typography } from 'shared/ui/kit';
import { Loading } from 'shared/components/loading';
import {
  FormatListBulletedRoundedIcon,
  AccessTimeRoundedIcon,
  FiberManualRecordRoundedIcon,
} from 'shared/ui/icons';
import BgFiguresImg1 from 'shared/assets/images/bg_figures_1.svg';
import ManPuzzleImg from 'shared/assets/images/man_puzzle.svg';
import ListDotImg from 'shared/assets/images/list_dot.svg';
import Pig2Img from 'shared/assets/images/pig_2.svg';
import BgFiguresImg2 from 'shared/assets/images/bg_figures_2.svg';
import BgFigureImg from 'shared/assets/images/bg_figure_1.svg';
import TeacherImg from 'shared/assets/images/teacher.png';
import Pig3Img from 'shared/assets/images/pig_3.svg';
import Price1Img from 'shared/assets/images/icons/price_1.svg';
import Price2Img from 'shared/assets/images/icons/price_2.svg';

import * as model from '../model';
import { CreateOrderButton } from 'features/order/create';
import { OrderStatus } from 'entities/order';
import { isValidFileName } from 'shared/lib/utils';
import { API_URL } from 'shared/config';
import NoImage from 'shared/assets/images/no-image.png';

export const CoursePage = () => {
  const { courseId } = useParams();

  useGate(model.Gate, courseId);

  const course = useStore(model.$course);
  const courseOrder = useStore(model.$courseOrder);

  return (
    <Container
      maxWidth="xl"
      sx={{
        position: 'relative',
        '&:before': {
          content: '""',
          display: { md: 'block', xs: 'none' },
          backgroundImage: `url('${BgFiguresImg1}')`,
          width: '1451px',
          height: '802px',
          position: 'absolute',
          zIndex: '-1',
          top: '0',
          right: '85%',
        },
      }}
    >
      {course ? (
        <Box>
          <Grid container spacing={8} sx={{ mb: '33px' }}>
            <Grid item md={5} xs={12}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                  background: '#FFFFFF',
                  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                  borderRadius: '16px',
                  p: '11px',
                  mb: '14px',
                }}
              >
                <Box>
                  <Typography
                    variant="h4"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      fontFamily: '"Montserrat", sans-serif',
                      fontWeight: 500,
                    }}
                  >
                    <FormatListBulletedRoundedIcon fontSize="large" sx={{ mr: '10px' }} />
                    {course.lessonsCount} lesson
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    variant="h4"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      fontFamily: '"Montserrat", sans-serif',
                      fontWeight: 500,
                    }}
                  >
                    <AccessTimeRoundedIcon fontSize="large" sx={{ mr: '10px' }} />
                    {course.duration}
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  background: '#FFFFFF',
                  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                  borderRadius: '16px',
                  p: '11px',
                  mb: '14px',
                }}
              >
                <Typography variant="h4" sx={{ textAlign: 'center', mb: '13px' }}>
                  {course.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ textAlign: 'center', fontFamily: '"Montserrat", sans-serif' }}
                >
                  {course.subtitle}
                </Typography>
              </Box>
              {courseOrder ? (
                <OrderStatus status={courseOrder.status} />
              ) : (
                <CreateOrderButton courseId={course.id} />
              )}
            </Grid>
            <Grid item md={7} xs={12}>
              <Box
                component="img"
                src={
                  isValidFileName(course.image)
                    ? `${API_URL}/course/image/${course.image}`
                    : NoImage
                }
                sx={{
                  background: '#FFFFFF',
                  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                  borderRadius: '21px',
                  width: '100%',
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="h2"
                sx={{
                  textAlign: 'center',
                  fontWeight: 900,
                  fontSize: { sm: '48px', xs: '40px' },
                  lineHeight: { sm: '59px', xs: '51px' },
                  mb: '20px',
                }}
              >
                Наша{' '}
                <Box
                  component="span"
                  sx={{
                    fontWeight: 900,
                    fontSize: { sm: '48px', xs: '40px' },
                    lineHeight: { sm: '59px', xs: '51px' },
                    color: '#44A5DC',
                  }}
                >
                  індивідуальна система
                </Box>{' '}
                навчання:
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  background: '#FFFFFF',
                  backgroundImage: { sm: `url('${ManPuzzleImg}')`, xs: 'none' },
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center right 5%',
                  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                  borderRadius: '16px',
                  px: '29px',
                  py: '22px',
                }}
              >
                <List>
                  {course.description.info.map((item) => (
                    <ListItem key={item.title}>
                      <ListItemIcon sx={{ mr: { sm: '16px', xs: '0' } }}>
                        <Box
                          component="img"
                          src={ListDotImg}
                          sx={{
                            width: { sm: '60px', xs: '35px' },
                            height: { sm: '60px', xs: '35px' },
                          }}
                        />
                      </ListItemIcon>
                      <Box>
                        <Typography variant="h3" sx={{ fontWeight: 400 }}>
                          {item.title}
                        </Typography>
                        <Typography variant="h4" sx={{ fontWeight: 200 }}>
                          {item.subtitle}
                        </Typography>
                      </Box>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
              <CreateOrderButton
                courseId={course.id}
                variant="contained"
                sx={{
                  fontWeight: 900,
                  width: { sm: '40%', xs: '100%' },
                  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                  border: 'none',
                  py: '21px',
                  '&:after': {
                    content: '""',
                    display: { sm: 'block', xs: 'none' },
                    backgroundImage: `url('${Pig2Img}')`,
                    backgroundSize: 'contain',
                    backgroundPosition: 'center center',
                    backgroundRepeat: 'no-repeat',
                    backgroundAttachment: 'fixed',
                    transform: 'rotate(21deg)',
                    width: { xl: '162px', lg: '142px', md: '122px', sm: '102px', xs: '82px' },
                    height: { xl: '212px', lg: '192px', md: '172px', sm: '152px', xs: '132px' },
                    position: 'absolute',
                    bottom: { sm: '-100%', xs: '-300%' },
                    right: { sm: '-30%', xs: '-20%' },
                    pointerEvents: 'none',
                  },
                }}
                disabled={!!courseOrder}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                backgroundImage: `url('${BgFiguresImg2}')`,
                backgroundPosition: 'center center',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: { sm: 'flex-start', xs: 'center' },
                  mb: '60px',
                }}
              >
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 900,
                    fontSize: { sm: '48px', xs: '40px' },
                    lineHeight: { sm: '59px', xs: '51px' },

                    flex: '0 0 auto',
                    background: '#FFFFFF',
                    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                    borderRadius: '16px',
                    py: { sm: '20px', xs: '15px' },
                    px: { sm: '137px', xs: '100px' },
                    position: 'relative',
                    '&:after': {
                      content: '""',
                      backgroundImage: `url('${Pig3Img}')`,
                      backgroundSize: 'contain',
                      backgroundPosition: 'center center',
                      backgroundRepeat: 'no-repeat',
                      backgroundAttachment: 'fixed',
                      transform: 'rotate(0deg)',
                      width: '73px',
                      height: '82px',
                      position: 'absolute',
                      bottom: '100%',
                      left: '15%',
                      pointerEvents: 'none',
                    },
                  }}
                >
                  Вартість
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexWrap: 'wrap-reverse',
                  gap: '89px 40px',
                  mb: '20px',
                }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    background:
                      'linear-gradient(0deg, #FFFFFF, #FFFFFF), linear-gradient(123.91deg, #FFFFFF -337.57%, #FFFFFF 115.27%)',
                    border: '3px solid #00A3FF',
                    borderRadius: '30px',
                    maxWidth: '300px',
                    flex: '0 0 auto',
                    pt: '50px',
                    pb: '45px',
                    px: '12px',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'absolute',
                      top: '-50px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: '#FFFFFF',
                      border: '3px solid #00A3FF',
                      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                      borderRadius: '70px',
                      width: '100px',
                      height: '100px',
                    }}
                  >
                    <Box component="img" src={Price1Img} />
                  </Box>
                  <Typography
                    sx={{
                      textAlign: 'center',
                      fontWeight: 800,
                      mb: '3px',
                    }}
                  >
                    Окрема покупка блоків
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      textAlign: 'center',
                      fontFamily: '"Montserrat", sans-serif',
                      mb: '22px',
                    }}
                  >
                    Що ви отримуєте ?
                  </Typography>
                  <List sx={{ mb: '40px' }}>
                    <ListItem>
                      <ListItemIcon sx={{ minWidth: '40px' }}>
                        <FiberManualRecordRoundedIcon fontSize="small" sx={{ color: '#3B3B47' }} />
                      </ListItemIcon>
                      <Box>
                        <Typography variant="body2" sx={{ fontFamily: '"Montserrat", sans-serif' }}>
                          Оберіть необхідний блок з темою
                        </Typography>
                      </Box>
                    </ListItem>
                    <ListItem>
                      <ListItemIcon sx={{ minWidth: '40px' }}>
                        <FiberManualRecordRoundedIcon fontSize="small" sx={{ color: '#3B3B47' }} />
                      </ListItemIcon>
                      <Box>
                        <Typography variant="body2" sx={{ fontFamily: '"Montserrat", sans-serif' }}>
                          Доступ лише до тих тем, котрі ви оберете
                        </Typography>
                      </Box>
                    </ListItem>
                    <ListItem>
                      <ListItemIcon sx={{ minWidth: '40px' }}>
                        <FiberManualRecordRoundedIcon fontSize="small" sx={{ color: '#3B3B47' }} />
                      </ListItemIcon>
                      <Box>
                        <Typography variant="body2" sx={{ fontFamily: '"Montserrat", sans-serif' }}>
                          Контроль своєї активності за допомогою отриманих балів
                        </Typography>
                      </Box>
                    </ListItem>
                    <ListItem>
                      <ListItemIcon sx={{ minWidth: '40px' }}>
                        <FiberManualRecordRoundedIcon fontSize="small" sx={{ color: '#3B3B47' }} />
                      </ListItemIcon>
                      <Box>
                        <Typography variant="body2" sx={{ fontFamily: '"Montserrat", sans-serif' }}>
                          Доступ до конспектів і презентацій блоку
                        </Typography>
                      </Box>
                    </ListItem>
                  </List>
                  <Typography
                    sx={{
                      textAlign: 'center',
                      fontWeight: 800,
                      mb: '3px',
                    }}
                  >
                    Індивідуальна ціна
                  </Typography>
                  <CreateOrderButton
                    courseId={course.id}
                    variant="contained"
                    color="secondary"
                    sx={{
                      position: 'absolute',
                      bottom: '-33px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      border: '3px solid #00A3FF',
                      borderRadius: '31px',
                      p: '18px',
                      whiteSpace: 'nowrap',
                      '&:hover': { backgroundColor: '#F9F9F9' },
                    }}
                    disabled={!!courseOrder}
                  />
                </Box>
                <Box
                  sx={{
                    position: 'relative',
                    background:
                      'linear-gradient(0deg, #FFFFFF, #FFFFFF), linear-gradient(123.91deg, #FFFFFF -337.57%, #FFFFFF 115.27%)',
                    border: '3px solid #00A3FF',
                    borderRadius: '30px',
                    maxWidth: '300px',
                    flex: '0 0 auto',
                    pt: '50px',
                    pb: '45px',
                    px: '12px',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'absolute',
                      top: '-50px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: '#FFFFFF',
                      border: '3px solid #00A3FF',
                      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                      borderRadius: '70px',
                      width: '100px',
                      height: '100px',
                    }}
                  >
                    <Box component="img" src={Price2Img} />
                  </Box>
                  <Typography
                    sx={{
                      textAlign: 'center',
                      fontWeight: 800,
                      mb: '3px',
                    }}
                  >
                    Доступ до всіх занять
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      textAlign: 'center',
                      fontFamily: '"Montserrat", sans-serif',
                      mb: '22px',
                    }}
                  >
                    Що ви отримуєте ?
                  </Typography>
                  <List sx={{ mb: '40px' }}>
                    <ListItem>
                      <ListItemIcon sx={{ minWidth: '40px' }}>
                        <FiberManualRecordRoundedIcon fontSize="small" sx={{ color: '#3B3B47' }} />
                      </ListItemIcon>
                      <Box>
                        <Typography variant="body2" sx={{ fontFamily: '"Montserrat", sans-serif' }}>
                          Повний доступ до всіх блоків на повний період навчання
                        </Typography>
                      </Box>
                    </ListItem>
                    <ListItem>
                      <ListItemIcon sx={{ minWidth: '40px' }}>
                        <FiberManualRecordRoundedIcon fontSize="small" sx={{ color: '#3B3B47' }} />
                      </ListItemIcon>
                      <Box>
                        <Typography variant="body2" sx={{ fontFamily: '"Montserrat", sans-serif' }}>
                          Повний доступ до презентацій, відео уроків і тд.
                        </Typography>
                      </Box>
                    </ListItem>
                    <ListItem>
                      <ListItemIcon sx={{ minWidth: '40px' }}>
                        <FiberManualRecordRoundedIcon fontSize="small" sx={{ color: '#3B3B47' }} />
                      </ListItemIcon>
                      <Box>
                        <Typography variant="body2" sx={{ fontFamily: '"Montserrat", sans-serif' }}>
                          Контроль своєї активності за допомогою отриманих балів
                        </Typography>
                      </Box>
                    </ListItem>
                    <ListItem>
                      <ListItemIcon sx={{ minWidth: '40px' }}>
                        <FiberManualRecordRoundedIcon fontSize="small" sx={{ color: '#3B3B47' }} />
                      </ListItemIcon>
                      <Box>
                        <Typography variant="body2" sx={{ fontFamily: '"Montserrat", sans-serif' }}>
                          Особиста статистика для кожного
                        </Typography>
                      </Box>
                    </ListItem>
                  </List>
                  <Typography
                    sx={{
                      textAlign: 'left',
                      fontWeight: 800,
                      ml: '40px',
                      mb: '3px',
                      textDecoration: 'line-through',
                      color: 'rgba(59, 59, 71, 0.52)',
                    }}
                  >
                    {course.cost.oldPrice} ₴
                  </Typography>
                  <Typography
                    variant="h3"
                    sx={{
                      textAlign: 'center',
                      fontSize: '32px',
                      lineheight: '39px',
                      mb: '3px',
                    }}
                  >
                    {course.cost.newPrice} ₴
                  </Typography>
                  <CreateOrderButton
                    courseId={course.id}
                    variant="contained"
                    color="secondary"
                    sx={{
                      position: 'absolute',
                      bottom: '-33px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      border: '3px solid #00A3FF',
                      borderRadius: '31px',
                      p: '18px',
                      whiteSpace: 'nowrap',
                      '&:hover': { backgroundColor: '#F9F9F9' },
                    }}
                    disabled={!!courseOrder}
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      ) : (
        <Loading />
      )}
    </Container>
  );
};
