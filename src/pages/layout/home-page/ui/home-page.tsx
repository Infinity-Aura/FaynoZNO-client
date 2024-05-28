import React from 'react';
import { Link } from 'react-router-dom';
import { useGate, useStore } from 'effector-react';

import { CoursesList } from 'entities/course';

import { Box, Button, Container, List, ListItem, ListItemIcon, Typography } from 'shared/ui/kit';
import { FiberManualRecordRoundedIcon } from 'shared/ui/icons';
import HomeBgImg from 'shared/assets/images/home_bg.svg';
import HomeBg1Img from 'shared/assets/images/home_bg_1.svg';
import HomeBg2Img from 'shared/assets/images/home_bg_2.svg';
import HomeBg3Img from 'shared/assets/images/home_bg_3.svg';
import W1Img from 'shared/assets/images/w_1.svg';
import W2Img from 'shared/assets/images/w_2.svg';
import W3Img from 'shared/assets/images/w_3.svg';
import W4Img from 'shared/assets/images/w_4.svg';
import W5Img from 'shared/assets/images/w_5.svg';
import Pig2Img from 'shared/assets/images/pig_2.svg';
import TeacherImg from 'shared/assets/images/teacher.png';
import BgFigure2Img from 'shared/assets/images/bg_figure_2.svg';
import Pig4Img from 'shared/assets/images/pig_4.svg';
import BgFiguresImg from 'shared/assets/images/bg_figures_1.svg';
import { PATHS } from 'shared/config';

import * as model from '../model';
import BgFigureImg from '../../../../shared/assets/images/bg_figure_1.svg';
import { Grid } from '../../../../shared/ui/kit';
import { Slider } from '../../../../shared/components/slider';

export const HomePage = () => {
  useGate(model.Gate);

  const courses = useStore(model.$courses);

  return (
    <Box>
      <Container
        maxWidth="xl"
        sx={{
          display: 'flex',
          position: 'relative',
          mb: '250px',
          '&:before': {
            content: '""',
            backgroundImage: `url('${HomeBgImg}')`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            width: { lg: '1007px', md: '900px', sm: '750px', xs: '500px' },
            height: { lg: '576px', md: '515px', sm: '429px', xs: '286px' },
            position: 'absolute',
            zIndex: '-1',
            bottom: { sm: '-20%', xs: '-5%' },
            right: { md: '-15%', sm: '-35%', xs: '-45%' },
          },
        }}
      >
        <Box sx={{ flex: '0 0 45%' }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { sm: '4.8rem', xs: '2.2rem' },
              lineHeight: { sm: '5.85rem', xs: '2.65rem' },
              mb: { sm: '30px', xs: '5px' },
            }}
          >
            Таки дуже файна підготовка до НМТ з Інессою Митроняк
          </Typography>
          <Typography
            sx={{
              fontSize: { sm: '1.2rem', xs: '0.9rem' },
              lineHeight: { sm: '1.65rem', xs: '1.35rem' },
              fontWeight: 400,
              mb: { sm: '30px', xs: '22px' },
            }}
          >
            Математичка ще ніколи
            <br />
            не була такою прикольною!
          </Typography>
          <Button
            component={Link}
            to={PATHS.courses}
            variant="contained"
            sx={{
              borderRadius: '36px',
              py: { md: '26px', sm: '9px' },
              px: { md: '96px', sm: '32px' },
            }}
          >
            Цікаво, ану доведи?
          </Button>
        </Box>
      </Container>
      <Container
        id="about"
        maxWidth="xl"
        sx={{
          display: 'flex',
          flexDirection: { lg: 'row', xs: 'column' },
          justifyContent: 'space-between',
          position: 'relative',
          minHeight: '530px',
          mb: '30px',
          gap: '290px 0',
          '&:before': {
            content: '""',
            backgroundImage: `url('${HomeBg1Img}')`,
            backgroundRepeat: 'no-repeat',
            width: '1000px',
            height: '750px',
            position: 'absolute',
            zIndex: '-1',
            top: { lg: '-3%', xs: '-20%' },
            left: { sm: '-23%', xs: '-70%' },
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flex: '0 0 50%',
            transform: { lg: 'rotate(-90deg)', xs: 'unset' },
          }}
        >
          <Typography
            variant="h2"
            color="secondary"
            sx={{
              position: 'relative',
              textAlign: 'center',
              '&:before': {
                content: '"ПРО НАС"',
                position: 'absolute',
                zIndex: '-1',
                top: '7px',
                left: '7px',
                color: '#89D4FF',
                whiteSpace: 'nowrap',
                textShadow: '-1px -1px 0 #FFF, 1px -1px 0 #FFF, -1px 1px 0 #FFF, 1px 1px 0 #FFF',
              },
            }}
          >
            ПРО НАС
          </Typography>
        </Box>
        <Box sx={{ flex: '0 0 45%', alignSelf: 'flex-end' }}>
          <Typography variant="h3" sx={{ fontWeight: 900 }}>
            Мій курс - вибір для тих, хто розраховний на результат
          </Typography>
          <List sx={{ mb: '40px' }}>
            <ListItem>
              <ListItemIcon sx={{ minWidth: '40px', mr: '12px' }}>
                <FiberManualRecordRoundedIcon fontSize="large" sx={{ color: '#3B3B47' }} />
              </ListItemIcon>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  Авторська програма
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 400 }}>
                  Лише те, що{' '}
                  <Typography variant="h6" sx={{ display: 'inline-block', fontWeight: 700 }}>
                    100%
                  </Typography>{' '}
                  пригодиться на іспиті, без жодного зайвого слова
                </Typography>
              </Box>
            </ListItem>
            <ListItem>
              <ListItemIcon sx={{ minWidth: '40px', mr: '12px' }}>
                <FiberManualRecordRoundedIcon fontSize="large" sx={{ color: '#3B3B47' }} />
              </ListItemIcon>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  Унікальні матеріали
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 400 }}>
                  Кожен конспект, презентація та робочий зошит зроблений з{' '}
                  <Typography variant="h6" sx={{ display: 'inline-block', fontWeight: 700 }}>
                    любов&apos;ю і мемчиками
                  </Typography>
                  , все коротко, миленько і по факту
                </Typography>
              </Box>
            </ListItem>
            <ListItem>
              <ListItemIcon sx={{ minWidth: '40px', mr: '12px' }}>
                <FiberManualRecordRoundedIcon fontSize="large" sx={{ color: '#3B3B47' }} />
              </ListItemIcon>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  Постійний зворотній зв&apos;язок
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 400 }}>
                  Ти ніколи не будеш відчувати себе самотнім, адже я та куратори{' '}
                  <Typography variant="h6" sx={{ display: 'inline-block', fontWeight: 700 }}>
                    постійно на зв&apos;язку
                  </Typography>
                  . Ми допоможемо з усіма питанням та вирішимо всі проблеми
                </Typography>
              </Box>
            </ListItem>
          </List>
        </Box>
      </Container>
      <Container
        maxWidth="xl"
        sx={{
          position: 'relative',
          minHeight: '530px',
          mb: '75px',
          '&:before': {
            content: '""',
            backgroundImage: { md: `url('${HomeBg2Img}')`, xs: `url('${HomeBg3Img}')` },
            backgroundRepeat: 'no-repeat',
            width: '2492px',
            height: '990px',
            position: 'absolute',
            zIndex: '-1',
            top: { md: '15%', xs: '11%' },
            transform: 'translateY(-20%)',
            left: { md: '30%', xs: '10%' },
          },
        }}
      >
        <Box
          sx={{
            mb: '62px',
          }}
        >
          <Typography
            variant="h1"
            sx={{
              zIndex: '1',
              position: 'relative',
              fontSize: { sm: '4.8rem', xs: '2.2rem' },
              lineHeight: { sm: '5.85rem', xs: '2.65rem' },
              '&:before': {
                content: '"ЧОМУ МИ ?"',
                position: 'absolute',
                zIndex: '-1',
                top: '7px',
                left: '7px',
                color: '#D0EEFF',
                textShadow:
                  '-1px -1px 0 #005E93, 1px -1px 0 #005E93, -1px 1px 0 #005E93, 1px 1px 0 #005E93',
              },
              '&:after': {
                content: '""',
                position: 'absolute',
                background: '#89D4FF',
                width: '626px',
                height: '141px',
                filter: 'blur(100px)',
                transform: 'matrix(-1, 0, 0, 1, 0, 0)',
                zIndex: '-2',
                top: '0',
                left: '0',
              },
            }}
          >
            ЧОМУ МИ ?
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { lg: 'row', xs: 'column' },
            gap: '50px 0',
            mb: '27px',
          }}
        >
          <Box sx={{ flex: '0 0 40%' }}>
            <Typography
              variant="h4"
              sx={{
                fontFamily: '"Source Serif Pro", serif',
                fontWeight: 500,
                mb: '20px',
                maxWidth: '444px',
              }}
            >
              Не бачу сенсу перехвалювати, тому напишу, як є -------{'>>>'}
            </Typography>
            <Button
              component={Link}
              to={PATHS.courses}
              variant="contained"
              sx={{
                background: '#3B3B47',
                border: '3px solid #706363',
                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                borderRadius: '24px',
                color: '#FFFFFF',
                py: '20px',
                px: '55px',
              }}
            >
              Вже хочу до вас!
            </Button>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: { lg: 'flex-end', xs: 'center' },
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '32px',
              flex: '0 0 60%',
            }}
          >
            <Box
              sx={{
                background: '#FFFFFF',
                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)',
                borderRadius: '18px',
                maxWidth: '280px',
                height: '380px',
                pt: '50px',
                pb: '15px',
                px: '21px',
              }}
            >
              <Box component="img" src={W1Img} sx={{ mb: '16px' }} />
              <Typography
                variant="h4"
                sx={{
                  mb: '8px',
                }}
              >
                Досвідчена викладачка
              </Typography>
              <Typography variant="body2">
                Середній прогрес учнів складає +57б, я точно знаю як готувати без стресу та зайвих
                нервів
              </Typography>
            </Box>
            <Box
              sx={{
                background: '#FFFFFF',
                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)',
                borderRadius: '18px',
                maxWidth: '280px',
                height: '380px',
                pt: '50px',
                pb: '15px',
                px: '21px',
              }}
            >
              <Box component="img" src={W5Img} sx={{ mb: '16px' }} />
              <Typography
                variant="h4"
                sx={{
                  mb: '8px',
                }}
              >
                Зручний графік
              </Typography>
              <Typography variant="body2">
                Можеш відвідувати як онлайн, так і переглядати їх у записі
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: { lg: 'flex-end', xs: 'center' },
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '32px',
          }}
        >
          <Box
            sx={{
              background: '#FFFFFF',
              boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)',
              borderRadius: '18px',
              maxWidth: '280px',
              height: '380px',
              pt: '50px',
              pb: '15px',
              px: '21px',
            }}
          >
            <Box component="img" src={W2Img} sx={{ mb: '16px' }} />
            <Typography
              variant="h4"
              sx={{
                mb: '8px',
              }}
            >
              Дружнє ком&apos;юніті
            </Typography>
            <Typography variant="body2">
              Тут не буде токсичних однокласників {'(бо я такого не допустю)'} тільки комфорт,
              затишок і смішки. Ну і трошки математики звісно :{')'}
            </Typography>
          </Box>
          <Box
            sx={{
              background: '#FFFFFF',
              boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)',
              borderRadius: '18px',
              maxWidth: '280px',
              height: '380px',
              pt: '50px',
              pb: '15px',
              px: '21px',
            }}
          >
            <Box component="img" src={W3Img} sx={{ mb: '16px' }} />
            <Typography
              variant="h4"
              sx={{
                mb: '8px',
              }}
            >
              Платиш не просто за уроки
            </Typography>
            <Typography variant="body2">
              Повір, я по собі знаю, що завжди є страх не витратити гроші даремно. Я ФОП, тож
              відповідальна за якість та ефективність своїх послуг як перед собою, так і перед
              законом.
            </Typography>
          </Box>
          <Box
            sx={{
              background: '#FFFFFF',
              boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)',
              borderRadius: '18px',
              maxWidth: '280px',
              height: '380px',
              pt: '50px',
              pb: '15px',
              px: '21px',
            }}
          >
            <Box component="img" src={W4Img} sx={{ mb: '16px' }} />
            <Typography
              variant="h4"
              sx={{
                mb: '8px',
              }}
            >
              Швидки результат
            </Typography>
            <Typography variant="body2">
              Запевняю, ти помітиш перші успіхи вже після перших занять
            </Typography>
          </Box>
        </Box>
      </Container>
      <Container
        id="teachers"
        maxWidth="xl"
        sx={{
          mb: '65px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: { lg: 'flex-end', xs: 'center' },
            mb: { sm: '120px', xs: '150px' },
          }}
        >
          <Box
            component="img"
            src={Pig2Img}
            sx={{
              width: { md: '136px', sm: '90px', xs: '63px' },
              height: { md: '139px', sm: '92px', xs: '65px' },
              mr: { lg: '20px', xs: '5px' },
            }}
          />
          <Typography
            variant="h1"
            sx={{
              zIndex: '1',
              position: 'relative',
              fontSize: { md: '4.8rem', sm: '4rem', xs: '2.2rem' },
              lineHeight: { md: '5.85rem', sm: '5.05rem', xs: '2.65rem' },
              '&:before': {
                content: '"ВИКЛАДАЧ"',
                position: 'absolute',
                zIndex: '-1',
                top: '7%',
                right: '0.6%',
                color: '#FFFFFF',
                whiteSpace: 'nowrap',
                textShadow:
                  '-1px -1px 0 #44A5DC, 1px -1px 0 #44A5DC, -1px 1px 0 #44A5DC, 1px 1px 0 #44A5DC',
              },
            }}
          >
            ВИКЛАДАЧ
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            backgroundImage: `url('${BgFigureImg}')`,
            backgroundPosition: { md: '20% bottom', xs: 'center center' },
            backgroundRepeat: 'no-repeat',
            backgroundSize: { sm: '567px 100%', xs: '400px 100%' },
            gap: '0 20px',
            mb: '20px',
          }}
        >
          <Box component="img" src={TeacherImg} sx={{ width: '352px', height: '100%' }} />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              background: '#FFFFFF',
              boxShadow: '0px 10px 10px rgba(0, 0, 0, 0.25)',
              borderRadius: '16px',
              maxWidth: '400px',
              flex: '0 0 auto',
              py: '35px',
              px: '40px',
            }}
          >
            <Typography
              variant="h3"
              sx={{
                textAlign: 'center',
                fontWeight: 700,
                mb: '11px',
              }}
            >
              Митроняк Інесса Павлівна
            </Typography>
            <Typography
              variant="body2"
              sx={{
                textAlign: 'center',
                fontFamily: '"Montserrat", sans-serif',
                fontWeight: 500,
              }}
            >
              lorem ipsum is simply dimply text pf the printing and typesetting industry. Lorem
              Ipsum has need the industry’s standart dummy text ever snce the 1500s, when an known
              prnter took galley of type and scrambled. lorem ipsum is simply dimply text pf the
              printing and typesetting industry. Lorem Ipsum has need the industry’s standart dummy
              text ever snce the 1500s, when an known prnter took galley of type and scrambled
            </Typography>
          </Box>
        </Box>
        <Slider
          options={{ spaceBetween: 20, slidesPerView: 3, loop: true }}
          slidesContent={[
            <Box
              key="cert1"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                background: '#FFFFFF',
                boxShadow: '0px 10px 10px rgba(0, 0, 0, 0.25)',
                borderRadius: '16px',
                maxWidth: '400px',
                flex: '0 0 auto',
                py: '35px',
                px: '40px',
                m: 3,
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  textAlign: 'center',
                  fontWeight: 700,
                  mb: '11px',
                }}
              >
                Митроняк Інесса Павлівна
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  textAlign: 'center',
                  fontFamily: '"Montserrat", sans-serif',
                  fontWeight: 500,
                }}
              >
                lorem ipsum is simply dimply text pf the printing and typesetting industry. Lorem
                Ipsum has need the industry’s standart dummy text ever snce the 1500s, when an known
                prnter took galley of type and scrambled. lorem ipsum is simply dimply text pf the
                printing and typesetting industry. Lorem Ipsum has need the industry’s standart
                dummy text ever snce the 1500s, when an known prnter took galley of type and
                scrambled
              </Typography>
            </Box>,
            <Box
              key="cert2"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                background: '#FFFFFF',
                boxShadow: '0px 10px 10px rgba(0, 0, 0, 0.25)',
                borderRadius: '16px',
                maxWidth: '400px',
                flex: '0 0 auto',
                py: '35px',
                px: '40px',
                m: 3,
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  textAlign: 'center',
                  fontWeight: 700,
                  mb: '11px',
                }}
              >
                Митроняк Інесса Павлівна
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  textAlign: 'center',
                  fontFamily: '"Montserrat", sans-serif',
                  fontWeight: 500,
                }}
              >
                lorem ipsum is simply dimply text pf the printing and typesetting industry. Lorem
                Ipsum has need the industry’s standart dummy text ever snce the 1500s, when an known
                prnter took galley of type and scrambled. lorem ipsum is simply dimply text pf the
                printing and typesetting industry. Lorem Ipsum has need the industry’s standart
                dummy text ever snce the 1500s, when an known prnter took galley of type and
                scrambled
              </Typography>
            </Box>,
            <Box
              key="cert3"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                background: '#FFFFFF',
                boxShadow: '0px 10px 10px rgba(0, 0, 0, 0.25)',
                borderRadius: '16px',
                maxWidth: '400px',
                flex: '0 0 auto',
                py: '35px',
                px: '40px',
                m: 3,
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  textAlign: 'center',
                  fontWeight: 700,
                  mb: '11px',
                }}
              >
                Митроняк Інесса Павлівна
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  textAlign: 'center',
                  fontFamily: '"Montserrat", sans-serif',
                  fontWeight: 500,
                }}
              >
                lorem ipsum is simply dimply text pf the printing and typesetting industry. Lorem
                Ipsum has need the industry’s standart dummy text ever snce the 1500s, when an known
                prnter took galley of type and scrambled. lorem ipsum is simply dimply text pf the
                printing and typesetting industry. Lorem Ipsum has need the industry’s standart
                dummy text ever snce the 1500s, when an known prnter took galley of type and
                scrambled
              </Typography>
            </Box>,
            <Box
              key="cert4"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                background: '#FFFFFF',
                boxShadow: '0px 10px 10px rgba(0, 0, 0, 0.25)',
                borderRadius: '16px',
                maxWidth: '400px',
                flex: '0 0 auto',
                py: '35px',
                px: '40px',
                m: 3,
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  textAlign: 'center',
                  fontWeight: 700,
                  mb: '11px',
                }}
              >
                Митроняк Інесса Павлівна
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  textAlign: 'center',
                  fontFamily: '"Montserrat", sans-serif',
                  fontWeight: 500,
                }}
              >
                lorem ipsum is simply dimply text pf the printing and typesetting industry. Lorem
                Ipsum has need the industry’s standart dummy text ever snce the 1500s, when an known
                prnter took galley of type and scrambled. lorem ipsum is simply dimply text pf the
                printing and typesetting industry. Lorem Ipsum has need the industry’s standart
                dummy text ever snce the 1500s, when an known prnter took galley of type and
                scrambled
              </Typography>
            </Box>,
            <Box
              key="cert5"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                background: '#FFFFFF',
                boxShadow: '0px 10px 10px rgba(0, 0, 0, 0.25)',
                borderRadius: '16px',
                maxWidth: '400px',
                flex: '0 0 auto',
                py: '35px',
                px: '40px',
                m: 3,
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  textAlign: 'center',
                  fontWeight: 700,
                  mb: '11px',
                }}
              >
                Митроняк Інесса Павлівна
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  textAlign: 'center',
                  fontFamily: '"Montserrat", sans-serif',
                  fontWeight: 500,
                }}
              >
                lorem ipsum is simply dimply text pf the printing and typesetting industry. Lorem
                Ipsum has need the industry’s standart dummy text ever snce the 1500s, when an known
                prnter took galley of type and scrambled. lorem ipsum is simply dimply text pf the
                printing and typesetting industry. Lorem Ipsum has need the industry’s standart
                dummy text ever snce the 1500s, when an known prnter took galley of type and
                scrambled
              </Typography>
            </Box>,
            <Box
              key="cert6"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                background: '#FFFFFF',
                boxShadow: '0px 10px 10px rgba(0, 0, 0, 0.25)',
                borderRadius: '16px',
                maxWidth: '400px',
                flex: '0 0 auto',
                py: '35px',
                px: '40px',
                m: 3,
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  textAlign: 'center',
                  fontWeight: 700,
                  mb: '11px',
                }}
              >
                Митроняк Інесса Павлівна
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  textAlign: 'center',
                  fontFamily: '"Montserrat", sans-serif',
                  fontWeight: 500,
                }}
              >
                lorem ipsum is simply dimply text pf the printing and typesetting industry. Lorem
                Ipsum has need the industry’s standart dummy text ever snce the 1500s, when an known
                prnter took galley of type and scrambled. lorem ipsum is simply dimply text pf the
                printing and typesetting industry. Lorem Ipsum has need the industry’s standart
                dummy text ever snce the 1500s, when an known prnter took galley of type and
                scrambled
              </Typography>
            </Box>,
            <Box
              key="cert7"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                background: '#FFFFFF',
                boxShadow: '0px 10px 10px rgba(0, 0, 0, 0.25)',
                borderRadius: '16px',
                maxWidth: '400px',
                flex: '0 0 auto',
                py: '35px',
                px: '40px',
                m: 3,
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  textAlign: 'center',
                  fontWeight: 700,
                  mb: '11px',
                }}
              >
                Митроняк Інесса Павлівна
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  textAlign: 'center',
                  fontFamily: '"Montserrat", sans-serif',
                  fontWeight: 500,
                }}
              >
                lorem ipsum is simply dimply text pf the printing and typesetting industry. Lorem
                Ipsum has need the industry’s standart dummy text ever snce the 1500s, when an known
                prnter took galley of type and scrambled. lorem ipsum is simply dimply text pf the
                printing and typesetting industry. Lorem Ipsum has need the industry’s standart
                dummy text ever snce the 1500s, when an known prnter took galley of type and
                scrambled
              </Typography>
            </Box>,
            <Box
              key="cert8"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                background: '#FFFFFF',
                boxShadow: '0px 10px 10px rgba(0, 0, 0, 0.25)',
                borderRadius: '16px',
                maxWidth: '400px',
                flex: '0 0 auto',
                py: '35px',
                px: '40px',
                m: 3,
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  textAlign: 'center',
                  fontWeight: 700,
                  mb: '11px',
                }}
              >
                Митроняк Інесса Павлівна
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  textAlign: 'center',
                  fontFamily: '"Montserrat", sans-serif',
                  fontWeight: 500,
                }}
              >
                lorem ipsum is simply dimply text pf the printing and typesetting industry. Lorem
                Ipsum has need the industry’s standart dummy text ever snce the 1500s, when an known
                prnter took galley of type and scrambled. lorem ipsum is simply dimply text pf the
                printing and typesetting industry. Lorem Ipsum has need the industry’s standart
                dummy text ever snce the 1500s, when an known prnter took galley of type and
                scrambled
              </Typography>
            </Box>,
          ]}
        />
      </Container>
      <Container
        id="teachers"
        maxWidth="xl"
        sx={{
          mb: '65px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: { lg: 'flex-end', xs: 'center' },
            mb: { sm: '220px', xs: '150px' },
          }}
        >
          <Box
            component="img"
            src={Pig2Img}
            sx={{
              width: { md: '136px', sm: '90px', xs: '63px' },
              height: { md: '139px', sm: '92px', xs: '65px' },
              mr: { lg: '20px', xs: '5px' },
            }}
          />
          <Typography
            variant="h1"
            sx={{
              zIndex: '1',
              position: 'relative',
              fontSize: { md: '4.8rem', sm: '4rem', xs: '2.2rem' },
              lineHeight: { md: '5.85rem', sm: '5.05rem', xs: '2.65rem' },
              '&:before': {
                content: '"КУРАТОРИ"',
                position: 'absolute',
                zIndex: '-1',
                top: '7%',
                right: '0.6%',
                color: '#FFFFFF',
                whiteSpace: 'nowrap',
                textShadow:
                  '-1px -1px 0 #44A5DC, 1px -1px 0 #44A5DC, -1px 1px 0 #44A5DC, 1px 1px 0 #44A5DC',
              },
            }}
          >
            КУРАТОРИ
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '175px 40px',
            mb: '27px',
          }}
        >
          <Box
            sx={{
              position: 'relative',
              background: '#FFFFFF',
              border: '5px solid #FFFFFF',
              boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
              borderRadius: '16px',
              flex: '0 0 30%',
              pt: '140px',
              pb: '32px',
              px: '25px',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: '-114px',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                justifyContent: 'center',
                backgroundImage: `url("${BgFigure2Img}")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center bottom',
                width: '300px',
                height: '228px',
              }}
            >
              <Box
                component="img"
                src={TeacherImg}
                sx={{ width: '185px', height: '100%', pb: '8px' }}
              />
            </Box>
            <Typography variant="h3" sx={{ fontWeight: 700, textAlign: 'center', mb: '11px' }}>
              Митроняк Інесса Павлівна
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontFamily: '"Montserrat", sans-serif', textAlign: 'center' }}
            >
              lorem ipsum is simply dimply text pf the printing and typesetting industry. Lorem
              Ipsum has need the industry’s standart dummy text ever snce the 1500s, when an known
              prnter took galley of type and scrambled
            </Typography>
          </Box>
          <Box
            sx={{
              position: 'relative',
              background: '#FFFFFF',
              border: '5px solid #FFFFFF',
              boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
              borderRadius: '16px',
              flex: '0 0 30%',
              pt: '140px',
              pb: '32px',
              px: '25px',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: '-114px',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                justifyContent: 'center',
                backgroundImage: `url("${BgFigure2Img}")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center bottom',
                width: '300px',
                height: '228px',
              }}
            >
              <Box
                component="img"
                src={TeacherImg}
                sx={{ width: '185px', height: '100%', pb: '8px' }}
              />
            </Box>
            <Typography variant="h3" sx={{ fontWeight: 700, textAlign: 'center', mb: '11px' }}>
              Митроняк Інесса Павлівна
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontFamily: '"Montserrat", sans-serif', textAlign: 'center' }}
            >
              lorem ipsum is simply dimply text pf the printing and typesetting industry. Lorem
              Ipsum has need the industry’s standart dummy text ever snce the 1500s, when an known
              prnter took galley of type and scrambled
            </Typography>
          </Box>
          <Box
            sx={{
              position: 'relative',
              background: '#FFFFFF',
              border: '5px solid #FFFFFF',
              boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
              borderRadius: '16px',
              flex: '0 0 30%',
              pt: '140px',
              pb: '32px',
              px: '25px',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: '-114px',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                justifyContent: 'center',
                backgroundImage: `url("${BgFigure2Img}")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center bottom',
                width: '300px',
                height: '228px',
              }}
            >
              <Box
                component="img"
                src={TeacherImg}
                sx={{ width: '185px', height: '100%', pb: '8px' }}
              />
            </Box>
            <Typography variant="h3" sx={{ fontWeight: 700, textAlign: 'center', mb: '11px' }}>
              Митроняк Інесса Павлівна
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontFamily: '"Montserrat", sans-serif', textAlign: 'center' }}
            >
              lorem ipsum is simply dimply text pf the printing and typesetting industry. Lorem
              Ipsum has need the industry’s standart dummy text ever snce the 1500s, when an known
              prnter took galley of type and scrambled
            </Typography>
          </Box>
        </Box>
      </Container>
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
              content: '"ВАРІАНТИ НАВЧАННЯ"',
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
              backgroundImage: `url('${Pig4Img}')`,
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
          ВАРІАНТИ НАВЧАННЯ
        </Typography>
        <Box sx={{ minHeight: 200, mb: '50px' }}>
          <CoursesList courses={courses} maxSize={3} />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            component={Link}
            to={PATHS.courses}
            variant="contained"
            sx={{ fontWeight: 900, border: 'none', borderRadius: '24px', py: '22px', px: '23px' }}
          >
            CПИСОК ВСІХ КУРСІВ
          </Button>
        </Box>
      </Container>
    </Box>
  );
};
