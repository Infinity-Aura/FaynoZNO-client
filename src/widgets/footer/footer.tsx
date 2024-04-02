import React from 'react';
import { Link } from 'react-router-dom';

import { Box, Container, Typography } from 'shared/ui/kit';

import LogoImg from 'shared/assets/images/logo_w.png';

const about = [
  'Про нас 1',
  'Про нас 2',
  'Про нас 3',
  'Про нас 4',
  'Про нас 5',
  'Про нас 6',
  'Про нас 7',
  'Про нас 8',
];

const contacts = ['+38050001110101', '+38050001110102', '+38050001110103'];

export const Footer = () => {
  return (
    <Box sx={{ py: '62px', backgroundColor: '#44A5DC' }}>
      <Container maxWidth="xl">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            rowGap: { xs: '57px', md: '0' },
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              rowGap: '17px',
              alignItems: { xs: 'center', md: 'flex-start' },
            }}
          >
            <Box component={Link} to={'/'}>
              <Box
                sx={{
                  display: 'inline-block',
                  width: 150,
                }}
                component="img"
                alt="Logo"
                src={LogoImg}
              />
            </Box>
            <Typography
              variant="body2"
              color="secondary"
              sx={{ maxWidth: 250, fontFamily: '"Montserrat", sans-serif' }}
            >
              lorem ipsum is simply dimply text pf the printing and typesetting industry. Lorem
              Ipsum has need the industry`s standart dummy text ever snce the 1500s.
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              rowGap: { xs: '57px', md: '0' },
              justifyContent: 'space-between',
              flex: '0 0 60%',
              columnGap: 'auto',
            }}
          >
            <Box sx={{ maxWidth: 320, display: 'flex', flexDirection: 'column', flex: '0 0 50%' }}>
              <Typography variant="subtitle1" color="secondary" sx={{ mb: '8px' }}>
                Про “платформу”
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', rowGap: '8px' }}>
                {about.map((item) => (
                  <Typography
                    key={item}
                    variant="body2"
                    color="secondary"
                    sx={{
                      display: 'inline-block',
                      fontFamily: '"Montserrat", sans-serif',
                      flex: '0 1 50%',
                      p: 0.5,
                    }}
                  >
                    {item}
                  </Typography>
                ))}
              </Box>
            </Box>
            <Box sx={{ maxWidth: 320, flex: '0 0 auto' }}>
              <Typography variant="subtitle1" color="secondary" sx={{ mb: '8px' }}>
                Контакти
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: '8px' }}>
                {contacts.map((item) => (
                  <Typography
                    key={item}
                    variant="body2"
                    color="secondary"
                    sx={{
                      display: 'inline-block',
                      fontFamily: '"Montserrat", sans-serif',
                      p: 0.5,
                    }}
                  >
                    {item}
                  </Typography>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
