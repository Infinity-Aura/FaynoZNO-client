import React from 'react';
import { NavLink } from 'react-router-dom';

import { Box, Button } from 'shared/ui/kit';

const ADMIN_PAGES = [
  { name: 'Курси', root: '/admin/courses' },
  { name: 'Викладачі', root: '/admin/teachers' },
  { name: 'Студенти', root: '/admin/students' },
  { name: 'Групи', root: '/admin/groups' },
  { name: 'Замовлення', root: '/admin/orders' },
];

export const AdminNavBar = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        gap: 1,
        background: '#FFFFFF',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        borderRadius: '16px',
        p: '24px',
      }}
    >
      <Box sx={{ display: 'flex', gap: 1 }}>
        {ADMIN_PAGES.map(({ name, root }) => (
          <Button
            component={NavLink}
            to={root}
            key={name}
            variant="text"
            sx={{
              display: 'block',
              fontSize: '1.2rem',
              lineHeight: '1.65rem',
              '&.active': {
                fontWeight: 800,
              },
            }}
          >
            {name}
          </Button>
        ))}
      </Box>
    </Box>
  );
};
