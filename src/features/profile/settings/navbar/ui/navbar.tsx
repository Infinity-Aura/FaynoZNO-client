import React from 'react';
import { NavLink } from 'react-router-dom';

import { Box, Button } from 'shared/ui/kit';

const SETTINGS_PAGES = [
  { name: 'Основна інформація', root: '/profile/settings/info' },
  { name: 'Контакти', root: '/profile/settings/contacts' },
  { name: 'Пароль', root: '/profile/settings/password' },
];

export const SettingsNavBar = () => {
  return (
    <Box
      sx={{
        background: '#FFFFFF',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        borderRadius: '16px',
        p: '24px',
      }}
    >
      {SETTINGS_PAGES.map(({ name, root }) => (
        <Button
          component={NavLink}
          to={root}
          key={name}
          variant="text"
          sx={{
            my: 2,
            display: 'block',
            fontSize: '1.2rem',
            lineHeight: '1.65rem',
            textAlign: 'left',
            '&.active': {
              fontWeight: 800,
            },
          }}
        >
          {name}
        </Button>
      ))}
    </Box>
  );
};
